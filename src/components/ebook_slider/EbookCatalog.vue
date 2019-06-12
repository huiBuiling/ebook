<template>
  <div class="slide-catalog">
    <!--搜索头-->
    <ebook-slider-top
      :searchVisible="searchVisible"
      :searchResult="searchResult"
      @visible="changeSearchVisible"
      @result="changeSearchResult"
    />

    <!--目录-->
    <div class="slide-catalog-con" v-show="!searchVisible">
      <ul>
        <li v-for="(item, index) in navigation" :key="index" :style="{'padding-left': item.parent !== undefined ? `${item.level * 15}px` : 0}">
          <p @click="goBook(item.href, -1)" :class="{selected: section === index}">{{item.label}}</p>
        </li>
      </ul>
    </div>

    <!--搜索结果-->
    <div class="slide-search-con" v-show="searchVisible">
      <ul>
        <li v-for="(item, index) in searchResult" :key="index">
          <p @click="goBook(item.cfi, index)" :class="{selected: currentLi === index}">{{item.excerpt}}</p>
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
        currentLi: -1,
        searchVisible: false,
        searchResult: []
      }
    },
    methods: {
      // 跳转到指定章节
      goBook (href, index, highlight = true) {
        if(index >= 0){
          this.currentLi = index
        }
        this.display(href, () => {
          this.hideTitleAndMenu()
          if (highlight) {
            this.currentBook.rendition.annotations.highlight(href)
          }
        })
      },
      changeSearchVisible (visible) {
        this.searchVisible = visible
      },
      changeSearchResult (val) {
        this.searchResult = val
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";
  .slide-catalog{
    width: 100%;
    height: 100%;
    .slide-catalog-con, .slide-search-con {
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
    .slide-catalog-con{
      p {
        @include ellipsis;
      }
    }
    .slide-search-con {
      height: calc(100% - #{px2rem(55)});
      ul{
        li{
          padding: px2rem(5) 0;
          p{
            line-height: px2rem(16);
          }
        }
      }
    }
  }

</style>
