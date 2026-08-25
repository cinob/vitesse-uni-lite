import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno:preflights.css'
import 'uno:component-defaults.css'
import 'uno:component-variants.css'
import 'uno:shortcuts.css'
import 'uno:default.css'

export function createApp() {
  const app = createSSRApp(App)

  return {
    app,
  }
}
