<template>
  <div class="e-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from "../../utils/mixin"
  export default {
    name: 'EbookReader',
    mixins: [ebookMixin],
    mounted () {
      let fileName = this.$route.params.fileName
      this.$store.dispatch('setFileName', fileName).then(() => {
        this.initEpub()
      })
    },
    methods: {
      initEpub () {
        const baseUrl = `http://172.22.2.100:1314/epub/Biomedicine/${this.fileName}.epub`
        // 配置路径
        this.book = new Epub(baseUrl)

        // 渲染
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          hegith: innerHeight,
          methods: 'default'
        })

        // 显示
        this.rendition.display()

        // 手势操作
        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        }, false)
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
      prevPage () {
        // 上一页
        if (this.rendition) {
          this.rendition.prev()
          this.hiddleTitleAndMenu()
        }
      },
      nextPage () {
        // 上一页
        if (this.rendition) {
          this.rendition.next()
          this.hiddleTitleAndMenu()
        }
      },
      hiddleTitleAndMenu () {
        // 隐藏title 和 menu
        this.$store.dispatch('setTitleVisible', false)
        this.$store.dispatch('setMenuVisible', false)
      },
      toggleTitleAndMenu () {
        // 显示/隐藏 title 和 menu
        this.$store.dispatch('setTitleVisible', !this.titleVisible)
        this.$store.dispatch('setMenuVisible', !this.menuVisible)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
