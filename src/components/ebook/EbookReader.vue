<template>
  <div class="ebook-reader">
    <!--书签配合蒙版方式实现-->
    <div class="ebook-reader-mask" @click="onMask"></div>

     <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'
  import { flatten, addCss } from '../../utils/book'
  import {
    getFontFamily, saveFontFamily,
    getFontSize, saveFontSize,
    getTheme, saveTheme,
    getLocation
  } from '../../utils/localStorage'
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
        const baseUrl = `${process.env.VUE_APP_RES_URL}/epub/Biomedicine/${this.fileName}.epub`
        // 配置路径
        this.book = new Epub(baseUrl)
        this.setCurrentBook(this.book)

        this.initRendition()
        // 手势移动设置书签不可行
        // this.initGesture()
        this.initParseBook()

        // 分页
        this.book.ready.then(() => {
          // 获取目录
          // this.navigation = self.book.navigation
          // console.log(self.book.navigation)
          // 生成Locations对象
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        }).then(location => {
          // 标记电子书为解析完毕状态
          this.setBookAvailable(true)

          this.refreshLocation()
        })
      },
      // 初始化渲染
      initRendition () {
        // 生成Rendition对象
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          methods: 'default'
        })

        // 显示及location载入
        const location = getLocation(this.fileName)
        // 渲染电子书
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
      // 初始化获取：图书封面及基本信息
      initParseBook () {
        // 封面图片获取
        this.book.loaded.cover.then(cover => {
          // 完整url:blob
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })

          // 书名及作者
          this.book.loaded.metadata.then(metadata => {
            this.setMetadata(metadata)
          })

          // 目录获取
          this.book.loaded.navigation.then(nav => {
            // this.setNavigation(nav.toc)
            const navItem = flatten(nav.toc)

            function find (item, level = 0) {
              return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
            }

            navItem.forEach(item => {
              item.level = find(item)
            })
            this.setNavigation(navItem)
          })
        })
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
            addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.min.css`)
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
      // 显示/隐藏 title 和 menu
      toggleTitleAndMenu () {
        if (this.menuVisible) {
            this.setSettingVisible(-1)
        }
        this.setTitleVisible(!this.titleVisible)
        this.setMenuVisible(!this.menuVisible)
      },
      // 蒙版操作
      onMask (e) {
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage()
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/global";
  .ebook-reader{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask{
      position: absolute;
      z-index: 150;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      opacity: 0;
    }
  }
</style>