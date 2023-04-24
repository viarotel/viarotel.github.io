// Google Analytics 网站数据流分析工具
import { GoogleAnalyticsId } from '@/configs/index'

if (!import.meta.env.SSR) {
  (async () => {
    const { install, gtag } = await import('ga-gtag').catch((e) =>
      console.error(e))

    install(GoogleAnalyticsId)
    gtag('js', new Date())
    gtag('config', GoogleAnalyticsId)
  })()
}
