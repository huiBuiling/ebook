<template>
  <div class="content-page-top">
    <!-- search -->
    <div class="page-top-search">
      <div class="page-top-search-input">
        <i class="icon-search"/>

        <!--@change="onSearch"-->
        <input
          type="text"
          v-model="value"
          :placeholder="$t('book.searchHint')"
          @click="showCancel"
          @keyup.enter.exact="onSearch"
        />
      </div>
      <span v-show="searchVisible" class="cancal" @click="hideCancel">{{$t('book.cancel')}}</span>
    </div>

    <div class="page-top-con" v-show="!searchVisible">
      <div class="page-top-con-l">
        <img :src="cover" :alt="fileName">
      </div>
      <div class="page-top-con-c" v-if="metadata">
        <p class="page-title">{{metadata.title}}</p>
        <div class="page-msg">
          <span>{{getReadProgress}}%</span>
          <span class="page-msg-bor"> | </span>
          <span>{{getReadTimeText}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /**
   * @author hui
   * @date 2019/6/4
   * @Description: 侧边栏顶部：搜索及书籍介绍
  */
  import { ebookMixin } from '../../utils/mixin'
  import { getReadTimeByMinute } from '../../utils/book'
  export default {
    name: 'EbookSliderTop',
    mixins: [ ebookMixin ],
    computed: {
      // 获取阅读进度
      getReadProgress () {
        return this.$t('book.haveRead').replace('$1', this.progress)
      },
      // 获取阅读时间
      getReadTimeText () {
        return getReadTimeByMinute(this.fileName)
      }
    },
    props: {
      searchVisible: Boolean,
      searchResult: Array
    },
    data () {
      return {
        value: ''
      }
    },
    methods: {
      showCancel () {
        this.$emit('visible', true)
      },
      hideCancel () {
        this.$emit('visible', false)
      },
      // 搜索
      onSearch () {
        if (this.value && this.value.length > 0) {
          this.doSearch(this.value).then(result => {
            this.$emit('result', result)
            this.value = ''
          })
        }
      },
      // epub全文搜索
      doSearch (q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(item =>
            item.load(this.currentBook.load.bind(this.currentBook))
              .then(item.find.bind(item, q))
              // 释放内存
              .finally(item.unload.bind(item)))
        ).then(results => Promise.resolve([].concat.apply([], results)))
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";

  .content-page-top{
    width: 100%;
    max-height: px2rem(150);
    .page-top-search{
      padding: px2rem(5);
      margin: px2rem(5);
      height: px2rem(30);
      font-size: px2rem(15);
      display: flex;
      align-items: center;
      div{
        flex: 1;
        border:1px solid #ddd;
        border-radius: 5px;
        padding:0 px2rem(5) px2rem(2);
        height: px2rem(30);
        i{
          flex: 1;
          font-size: px2rem(10);
          margin-left: px2rem(5);
          vertical-align: middle;
        }
        input{
          flex: 1;
          height: px2rem(30);
          background: #ecf6ff;
          border: none;
          -webkit-appearance: none;
          outline: none;
          margin-left: px2rem(10);
          color: #959B9C;
        }
      }
      .cancal{
        flex: 0 0 px2rem(50);
        @include right;
      }
    }
    .page-top-con{
      width: 100%;
      height: px2rem(80);
      display: flex;
      align-items: center;
      .page-top-con-l{
        margin-left: px2rem(10);
        flex: 0 0 px2rem(45);
        img{
          width: px2rem(40);
          height: px2rem(50);
        }
      }
      .page-top-con-c{
        flex: 1;
        padding: 0 px2rem(7);
        width: calc(100% - #{px2rem(173)});
        .page-title{
          @include ellipsis;
          font-size: px2rem(14);
          margin-bottom: px2rem(7);
        }
        .page-msg{
          margin-right: px2rem(10);
          flex: 0 0 px2rem(75);
          line-height: px2rem(15);
          span {
            display: inline-block;
            font-size: px2rem(12);
            white-space: nowrap;
            &.page-msg-bor{
              margin: 0 px2rem(10);
            }
          }
        }
      }
    }
  }
</style>
