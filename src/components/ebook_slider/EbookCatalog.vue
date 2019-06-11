<template>
  <div class="slide-catalog">
    <ebook-slider-top />
    <div class="slide-catalog-con">
      <ul>
        <li v-for="(item, index) in navigation" :key="index" :style="{'padding-left': item.parent !== undefined ? `${item.level * 15}px` : 0}">
          <p @click="goBook(item.href, index)" :class="{selected: section === index}">{{item.label}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /**
   * @author hui
   * @date 2019/6/4
   * @Description: 目录
  */
  import EbookSliderTop from './EbookSlideTop'
  import { ebookMixin } from '../../utils/mixin'
  export default {
    name: 'EbookCatalog',
    components: {
      EbookSliderTop
    },
    mixins: [ebookMixin],
    data () {
      return {
        currentLi: -1
      }
    },
    methods: {
      // 跳转到指定章节
      goBook (href, index, highlight = false) {
        console.log(index)
        console.log(this.section);
        this.currentLi = index
        this.display(href, () => {
          this.hideTitleAndMenu()
          if (highlight) {
            this.currentBook.rendition.annotations.highlight(href)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";
  .slide-catalog{
    width: 100%;
    height: 100%;
    .slide-catalog-con {
      height: calc(100% - #{px2rem(130)});
      overflow-x: hidden;
      font-size: 0;
      margin-right: px2rem(10);
      ul {
        font-size: px2rem(12);
        padding-left: px2rem(10);
        li {
          width: 100%;
          min-height: px2rem(30);
          line-height: px2rem(30);
          border-top: 1px solid #ddd;
          &:first-child{
            border-top: none;
          }
          p {
            @include ellipsis;
          }
          .selected{
            color: red;
          }
          ul {
            li {
              border-top: 1px solid #ddd !important;
            }
          }
        }
      }
    }
  }

</style>
