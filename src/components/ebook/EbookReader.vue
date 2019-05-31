<template>
  <div class="e-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'
  import { getFontFamily,saveFontFamily } from '../../utils/localStorage'
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
        const baseUrl = `${process.env.VUE_APP_RES_URL}/epub/Statistics/${this.fileName}.epub`
        // 配置路径
        this.book = new Epub(baseUrl)
        this.setCurrentBook(this.book)
        // 渲染
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          methods: 'default'
        })

        // 显示
        this.rendition.display().then(() => {
          let font = getFontFamily(this.fileName)
          let fontSize = getFontFamily(this.fileName)
          console.log(fontSize);
          if(!font){
            saveFontFamily(this.fileName, this.defaultFontFamily)
          }else{
            this.rendition.themes.font(font)
            this.setDefaultFontFamily(font)
          }
        })

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
      prevPage () {
        // 上一页
        if (this.rendition) {
          this.rendition.prev()
          this.hideTitleAndMenu()
        }
      },
      nextPage () {
        // 上一页
        if (this.rendition) {
          this.rendition.next()
          this.hideTitleAndMenu()
        }
      },
      hideTitleAndMenu () {
        // 隐藏title 和 menu
        this.setTitleVisible(false)
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
      },
      toggleTitleAndMenu () {
        // 显示/隐藏 title 和 menu
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
