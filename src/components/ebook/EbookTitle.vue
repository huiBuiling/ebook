<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="titleVisible">
      <div class="e-title-l">
        <span class="icon icon-back"></span>
        <span class="title">
          {{getSectionName}}
        </span>
      </div>
      <div class="e-title-r">
        <div class="icons">
          <span class="icon icon-shelf"></span>
        </div>
        <div class="icons">
          <span class="icon icon-cart"></span>
        </div>
        <div class="icons">
          <span class="icon icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  export default {
    name: 'EbookTitle',
    mixins: [ebookMixin],
    computed: {
      // 获取当前章目
      getSectionName () {
        if (this.section) {
          const sectionInfo = this.currentBook.section(this.section)
          if (sectionInfo && sectionInfo.href) {
            return this.currentBook.navigation.get(sectionInfo.href).label
          }
        }
        return ''
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/global";
  $tit:px2rem(22);
  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 210;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    .e-title-l {
      /*flex: 0 0 px2rem(120);*/
      flex: 1;
      @include left;
      margin-left: px2rem(15);
      overflow: hidden;
      .title{
        @include ellipsis;
        font-size: px2rem(16);
      }
    }
    .e-title-r {
      /*flex: 1;*/
      display: flex;
      flex: 0 0 px2rem(120);
      justify-content: flex-end;
      .icons {
        flex: 0 0 px2rem(40);
        @include center;
        .icon-shelf {
          font-size: px2rem(22);
        }
        .icon-cart {
          font-size: px2rem(22);
        }
      }
    }
  }
</style>
