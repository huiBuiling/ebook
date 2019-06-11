<template>
  <div class="content-page-top">
    <div class="page-top-search">
      <div>
        <i class="icon-search"/>
        <input
          type="text"
          v-model="value"
          :placeholder="$t('book.searchHint')"
          @click="showCancel"
        />
      </div>
      <span v-show="searchVisible" class="cancal" @click="hideCancel">{{$t('book.cancel')}}</span>
    </div>
    <div class="page-top-con">
      <div class="page-top-con-l">
        <img :src="cover" :alt="fileName">
      </div>
      <div class="page-top-con-c" v-if="metadata">
        <p class="e-title">{{metadata.title}}</p>
        <p class="e-creator">{{metadata.creator}}</p>
      </div>
      <div class="page-top-con-r">
        <p>已读{{progress}}%</p>
        <p>{{getReadTimeText}}</p>
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
      // 获取阅读时间
      getReadTimeText () {
        return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
      }
    },
    data () {
      return {
        value: '',
        searchVisible: false
      }
    },
    methods: {
      showCancel () {
        this.searchVisible = true
      },
      hideCancel () {
        this.searchVisible = false
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";

  .content-page-top{
    width: 100%;
    border-bottom: 1px solid #ddd;
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
          font-size: px2rem(18);
          margin-left: px2rem(5);
        }
        input{
          flex: 1;
          height: px2rem(30);
          background: #ecf6ff;
          border: none;
          -webkit-appearance: none;
          outline: none;
          margin-left: px2rem(10);
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
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .page-top-con-c{
        flex: 1;
        padding: 0 px2rem(7);
        width: calc(100% - #{px2rem(173)});
        .e-title{
          @include ellipsis;
          font-size: px2rem(14);
          margin-bottom: px2rem(7);
        }
        .e-creator{
          line-height: px2rem(14);
          font-size: px2rem(12);
          &:last-child{
            @include ellipsis2(2);
          }
        }
      }
      .page-top-con-r{
        margin-right: px2rem(10);
        flex: 0 0 px2rem(75);
        p {
          width: px2rem(75);
          font-size: px2rem(12);
          white-space: nowrap;
          line-height: px2rem(20);
        }
      }
    }
  }
</style>
