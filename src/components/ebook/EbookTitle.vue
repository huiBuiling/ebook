<template>
  <transition name="slide-down">
    <div class="e-reader-title" v-show="titleVisible">
      <div class="e-title-l">
        <span class="icon icon-back"></span>
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
  import Epub from 'epubjs'
  import {mapGetters} from 'vuex'
  export default {
    name: 'EbookTitle',
    computed: {
      ...mapGetters([
        'titleVisible'
      ])
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/global";
  .e-reader-title {
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
      flex: 0 0 px2rem(60);
      @include left;
      margin-left: px2rem(15);
    }
    .e-title-r {
      flex: 1;
      display: flex;
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
