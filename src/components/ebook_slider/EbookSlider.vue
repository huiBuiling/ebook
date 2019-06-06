<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper">
            <!--内容-->
            <div class="content-page"></div>

            <!--tab:目录 | 书签-->
            <div class="content-page-tab">
              <div class="content-page-tab-item"
                   :class="{'selected': currentTab === 1}">
                {{$t('book.navigation')}}</div>
              <div class="content-page-tab-item"
                   :class="{'selected': currentTab === 2}">
                {{$t('book.bookmark')}}</div>
            </div>
          </div>
        </div>
      </transition>
      <!--遮罩层-->
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </transition>
</template>

<script>
  /**
   * @author hui
   * @date 2019/6/4
   * @Description: 侧边栏
  */
  import { ebookMixin } from '../../utils/mixin'
  export default {
    name: 'EbookSlider',
    mixins: [ ebookMixin ],
    data () {
      return {
        currentTab: 1
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";

  .slide-content-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 211;
    .content{
      flex: 0 0 85%;
      width: 85%;
      height: 100%;
      .content-page-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .content-page{
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        .content-page-tab{
          display: flex;
          flex: 0 0 px2rem(48);
          width: 100%;
          height: px2rem(48);
          .content-page-tab-item{
            flex: 1;
            font-size: px2rem(12);
            @include center;
          }
        }
      }
    }
    .content-bg{
      flex: 0 0 15%;
      width: 15%;
      height: 100%;
    }
  }
</style>
