import { getReadTime,getLocale } from './localStorage'

// 字号
export const FONT_SIZE_LIST = [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
]

// 字体类型
export const FONT_FAMILY = [
    { font: 'Default' },
    { font: 'Cabin' },
    { font: 'Days One' },
    { font: 'Montserrat' },
    { font: 'Tangerine' }
]

// 主题
export function themeList (vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#666666',
          'background': '#ffffff'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background': '#c6c2b6'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background': '#a9c1a9'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#1C2842'
        }
      }
    }
  ]
}

// 动态添加css文件
export function addCss (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

// 动态删除css文件
export function removeCss (href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
      link.parentNode.removeChild(link)
    }
  }
}

// 全局切换主题，删除全部动态添加的css文件
export function removeAllCss () {
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}

// 阅读时间（分钟）
export function getReadTimeByMinute (fileName) {
  const readTime = getReadTime(fileName)
  let text = !getLocale() ? 'minutes' : '分钟'
  if (!readTime) {
    return 0 + text
  } else if (readTime > 0 && readTime < 60) {
    // 分
    return Math.ceil(readTime / 60) + text
  } else if (readTime > 60 && readTime < 24*60) {
    // 时
    text = !getLocale() ? 'hour':'小时'
    return Math.ceil(readTime / 60 / 60) + text
  } else if (readTime > 24*60) {
    // 天
    text = !getLocale() ? 'day':'天'
    return Math.ceil(readTime / 60 / 60 / 24) + text
  }
}

// 转换目录 navigation
export function flatten (array) {
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}

// rem适配
export function px2rem (px) {
  const ratio = 375 / 10
  return px / ratio
}

// 宽度
export function realPx (px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}
