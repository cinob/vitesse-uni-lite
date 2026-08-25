import type { Ref } from 'vue'

export interface PaginationResult<T> {
  list: T[]
  total?: number
  hasMore?: boolean
}

export interface UsePaginationOptions<T> {
  fetcher: (page: number, pageSize: number) => Promise<PaginationResult<T> | T[]>
  pageSize?: number
  onSuccess?: (items: T[]) => void
}

/**
 * 通用列表分页与触底加载、下拉刷新组合式函数
 */
export function usePagination<T>(options: UsePaginationOptions<T>) {
  const { fetcher, pageSize = 20, onSuccess } = options
  const list = ref<T[]>([]) as Ref<T[]>
  const page = ref(1)
  const isRefreshing = ref(false)
  const isLoadingMore = ref(false)
  const hasMore = ref(true)
  const hasLoaded = ref(false)

  function getItems(res: PaginationResult<T> | T[]): T[] {
    return Array.isArray(res) ? res : res.list || []
  }

  function getNextHasMore(res: PaginationResult<T> | T[], items: T[]): boolean {
    if (!Array.isArray(res) && typeof res.hasMore === 'boolean') {
      return res.hasMore
    }
    return items.length >= pageSize
  }

  async function refresh() {
    if (isRefreshing.value)
      return
    isRefreshing.value = true
    page.value = 1

    try {
      const res = await fetcher(1, pageSize)
      const items = getItems(res)
      list.value = items
      hasMore.value = getNextHasMore(res, items)
      hasLoaded.value = true
      onSuccess?.(items)
    }
    catch {
      if (!hasLoaded.value)
        list.value = []
    }
    finally {
      isRefreshing.value = false
    }
  }

  async function loadMore() {
    if (isRefreshing.value || isLoadingMore.value || !hasMore.value)
      return
    isLoadingMore.value = true

    try {
      const nextPage = page.value + 1
      const res = await fetcher(nextPage, pageSize)
      const items = getItems(res)
      list.value = [...list.value, ...items]
      page.value = nextPage
      hasMore.value = getNextHasMore(res, items)
      hasLoaded.value = true
      onSuccess?.(items)
    }
    finally {
      isLoadingMore.value = false
    }
  }

  return {
    list,
    page,
    isRefreshing,
    isLoadingMore,
    hasMore,
    hasLoaded,
    refresh,
    loadMore,
  }
}
