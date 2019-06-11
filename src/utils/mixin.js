import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss } from './book'
import { saveLocation } from './localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'titleVisible',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    // 设置主题
    themeList () {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setCurrentSong',
      'setTitleVisible',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
       // 设置进度条可读
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setFileName'
    ]),
    initGlobalCss () {
      // 删除全部样式
      removeAllCss()

      // 初始化样式css文件
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    // 刷新位置
    refreshLocation () {
      const curLocation = this.currentBook.rendition.currentLocation()
      if (curLocation && curLocation.start) {
        const startCfi = curLocation.start.cfi
        const curProgress = this.currentBook.locations.percentageFromCfi(startCfi)
        // 设置进度
        this.setProgress(Math.floor(curProgress * 100))
        // 设置章节
        this.setSection(curLocation.start.index)
        // 存储地址
        saveLocation(this.fileName, startCfi)
      }
    },
    // 显示渲染
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          // 存在回调则直接调用
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    // 隐藏title 和 menu
    hideTitleAndMenu () {
      this.setTitleVisible(false)
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
    }
  }
}
