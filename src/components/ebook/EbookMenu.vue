<template>
  <div class="opera-wrapper">
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="menuVisible" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}">
        <div class="icons">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icons">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icons">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icons">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>

    <!--字体-->
    <setting-font />

    <!--主题-->
    <setting-theme />

    <!--进度-->
    <setting-progress />

    <!--侧边栏：目录 | 书签-->
    <ebook-slider />
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import SettingFont from '../ebook_setting/SettingFont'
  import SettingTheme from '../ebook_setting/SettingTheme'
  import SettingProgress from '../ebook_setting/SettingProgress'
  import EbookSlider from '../ebook_slider/EbookSlider'
  export default {
    name: 'EbookMenu',
    components: {
      SettingFont,
      SettingTheme,
      SettingProgress,
      EbookSlider
    },
    mixins: [ebookMixin],
      methods: {
          showSetting (key) {
              this.setSettingVisible(key)
          }
      }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icons {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
</style>
