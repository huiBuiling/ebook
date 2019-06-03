<template>
  <div class="e-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'
  import {
    getFontFamily, saveFontFamily,
    getFontSize, saveFontSize,
    getTheme, saveTheme,
    getLocation
  } from '../../utils/localStorage'
  import { addCss } from '../../utils/book'
  export default {
    name: 'EbookReader',
    mixins: [ebookMixin],
    mounted () {
      let fileName = this.$route.params.fileName
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    },
    methods: {
      initEpub () {
        // 渲染书籍
        const baseUrl = `${process.env.VUE_APP_RES_URL}/epub/LifeSciences/${this.fileName}.epub`
        // 配置路径
        this.book = new Epub(baseUrl)
        this.setCurrentBook(this.book)

        this.initRendition()
        this.initGesture()

        // 分页
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        }).then(location => {
          // console.log(location)
          // 分页成功，设置进度条可读
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      },
      // 初始化渲染
      initRendition () {
        // 渲染
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          methods: 'default'
        })

        // 显示及location载入
        const location = getLocation(this.fileName)
        this.display(location, () => {
          this.initTheme()
          this.initFont()
          this.initFontSize()
          this.initGlobalCss()
        })

        // 引入字体样式文件
        // process.env.VEE_APP_RES_URL 变量对应.env.development
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          ]).then(() => {})
        })
      },
      // 初始化手势操作
      initGesture () {
        // 手势操作start
        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        }, false)

        // 手势操作end
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchStartX
          const time = event.timeStamp - this.touchStartTime
          if (time < 500 && offsetX > 40) {
            // 下一页
            this.prevPage()
          } else if (time < 500 && offsetX < -40) {
            // 上一页
            this.nextPage()
          } else {
            // 显示标题栏
            this.toggleTitleAndMenu()
          }

          // 禁止事件调用和传播
          // event.preventDefault()
          // event.stopPropagation()
        }, false)
      },
      // 初始化主题
      initTheme () {
        let theme = getTheme(this.fileName)
        if (!theme) {
          saveTheme(this.fileName, this.defaultTheme)
        }
        this.setDefaultTheme(theme)
        // 注册theme属性
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })

        this.rendition.themes.select(this.defaultTheme)
      },
      // 初始化样式css文件
      initGlobalCss () {
        switch (this.defaultTheme) {
          case 'Default':
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
            break
          case 'Gold':
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
            break
          case 'Eye':
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
            break
          case 'Night':
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
            break
          default:
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
            break
        }
      },
      // 初始化字体大小
      initFontSize () {
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
           saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          //  设置存储字体大小
          this.rendition.themes.fontSize(fontSize + 'px')
          this.setDefaultFontSize(fontSize)
        }
      },
      // 初始化字体
      initFont () {
        let font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          //  设置存储字体
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      // 上一页
      prevPage () {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      // 下一页
      nextPage () {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      // 隐藏title 和 menu
      hideTitleAndMenu () {
        this.setTitleVisible(false)
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
      },
      // 显示/隐藏 title 和 menu
      toggleTitleAndMenu () {
        if (this.menuVisible) {
            this.setSettingVisible(-1)
        }
        this.setTitleVisible(!this.titleVisible)
        this.setMenuVisible(!this.menuVisible)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
