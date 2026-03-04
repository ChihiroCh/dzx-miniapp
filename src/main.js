import { createSSRApp } from 'vue'
import App from './App.vue'
import http from '@/utils/request'

export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$http = http
  app.provide('http', http)
  return {
    app,
  }
}
