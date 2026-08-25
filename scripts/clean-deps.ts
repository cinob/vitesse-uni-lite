import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const UNUSED_UNI_DEPS = [
  '@dcloudio/uni-app-harmony',
  '@dcloudio/uni-app-plus',
  '@dcloudio/uni-mp-baidu',
  '@dcloudio/uni-mp-harmony',
  '@dcloudio/uni-mp-jd',
  '@dcloudio/uni-mp-kuaishou',
  '@dcloudio/uni-mp-lark',
  '@dcloudio/uni-mp-qq',
  '@dcloudio/uni-mp-toutiao',
  '@dcloudio/uni-mp-xhs',
  '@dcloudio/uni-quickapp-webview',
]

function getPackageManager(): 'pnpm' | 'bun' | 'npm' {
  if (existsSync('pnpm-lock.yaml'))
    return 'pnpm'
  if (existsSync('bun.lock') || existsSync('bun.lockb'))
    return 'bun'
  return 'npm'
}

function cleanDependencies() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'))
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  }

  const toRemove = UNUSED_UNI_DEPS.filter(dep => dep in allDeps)

  if (toRemove.length === 0) {
    console.log('✨ 依赖已保持精简，没有需要清理的多余平台依赖。')
    return
  }

  const pm = getPackageManager()
  console.log(`🧹 正在使用 ${pm} 移除未使用的多端依赖:`)
  console.log(toRemove.map(d => `  - ${d}`).join('\n'))

  try {
    const cmd = pm === 'npm'
      ? `npm uninstall ${toRemove.join(' ')}`
      : `${pm} remove ${toRemove.join(' ')}`

    execSync(cmd, { stdio: 'inherit' })
    console.log('✅ 依赖清理完成！')
  }
  catch (error) {
    console.error('❌ 依赖清理失败：', error)
    process.exit(1)
  }
}

cleanDependencies()
