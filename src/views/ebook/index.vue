<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookMenu from '../../components/ebook/EbookMenu'
  import { getReadTime, saveReadTime } from '../../utils/localStorage'
  import { ebookMixin } from '../../utils/mixin'
  export default {
    name: 'Ebook',
    components: {
      EbookTitle,
      EbookReader,
      EbookMenu
    },
    mixins: [ebookMixin],
    methods: {
      startLoopReadTime () {
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }

        // 开启定时器，每秒
        this.task = setInterval(() => {
          readTime++
          // 已读30秒倍数，保存一次
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted () {
      this.startLoopReadTime()
    },
    beforeDestroy () {
      // 销毁前关闭定时器
      if (this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";
  .ebook {
    width: 100%;
    .text{
      font-family: 'Days One';
      font-size: px2rem(10);
      color: red;
    }
  }
</style>
