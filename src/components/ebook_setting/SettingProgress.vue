<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)"
                 @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  /**
   * @author hui
   * @date 2019/6/3
   * @Description: 进度
  */
  import { ebookMixin } from '../../utils/mixin'
  import { getReadTimeByMinute } from '../../utils/book'
  export default {
    name: 'SettingProgress',
    mixins: [ebookMixin],
    computed: {
      // 获取当前章目
      getSectionName () {
        // 获取多级目录
        return this.section ? this.navigation[this.section].label : ''
      },
      // 获取阅读时间
      getReadTimeText () {
        return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
      }
    },
    methods: {
      // 进度变化:修改完成后触发的事件
      onProgressChange (progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress()
          this.updateProgressBg()
          // saveProgress(this.fileName, progress)
        })
      },
      // 修改过程事件，拖动滑块即会触发
      onProgressInput (progress) {
        this.setProgress(progress).then(() => {
          this.updateProgressBg()
          // saveProgress(this.fileName, progress)
        })
      },
      // 进度条显示状态
      displayProgress () {
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        this.display(cfi)
      },
      // 更新已读进度背景色变化
      updateProgressBg () {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },
      // 上一页
      prevSection () {
        if (this.section > 0 && this.bookAvailable) {
          this.setSection(this.section - 1).then(() => {
            this.displaySection()
          })
        }
      },
      // 下一页
      nextSection () {
        if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
          this.setSection(this.section + 1).then(() => {
            this.displaySection()
          })
        }
      },
      // 显示页
      displaySection () {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          this.display(sectionInfo.href)
        }
      }
    },
    updated () {
      this.updateProgressBg()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/global";

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(47);
    left: 0;
    z-index: 160;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        font-size: px2rem(12);
        @include center;
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress-icon-wrapper {
          font-size: px2rem(20);
        }
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(1);
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        color: #666;
        font-size: px2rem(12);
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          @include ellipsis;
        }
      }
    }
  }
</style>
