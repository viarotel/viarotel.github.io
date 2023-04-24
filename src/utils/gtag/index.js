// Google Analytics 网站数据流分析工具
import { install, gtag } from 'ga-gtag'
import { GoogleAnalyticsId } from '@/configs/index'

install(GoogleAnalyticsId)
gtag('js', new Date())
gtag('config', GoogleAnalyticsId)
