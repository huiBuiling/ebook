const book = {
  state: {
    // 书名
    fileName: '',
    titleVisible: false,
    menuVisible: false,
    /**
     * -1:不显示
     * 0: 字号
     * 1：主题
     * 2：进度
     * 3：目录
    */
    settingVisible: -1,
    // 默认字体
    defaultFontSize: 12,
    // 默认字体类型
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    // 默认主题
    defaultTheme: 'Default',
    // 进度条是否可读，即是否分页
    bookAvailable: false,
    // 进度条
    progress: 0,
    // 进度条
    section: 0,
    // 分页
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    // 书签
    isBookmark: null
  },
  mutations: {
    'SET_FILE_NAME': (state, newName) => {
      state.fileName = newName
    },
    'SET_TITLE_VISIBLE': (state, newTitle) => {
      state.titleVisible = newTitle
    },
    'SET_MENU_VISIBLE': (state, newMenu) => {
      state.menuVisible = newMenu
    },
    'SET_SETTING_VISIBLE': (state, key) => {
      state.settingVisible = key
    },
    'SET_DEFAULT_FONT_SIZE': (state, defaultSize) => {
        state.defaultFontSize = defaultSize
    },
    'SET_DEFAULT_FONT_FAMILY': (state, font) => {
        state.defaultFontFamily = font
    },
    'SET_FONT_FAMILY_VISIBLE': (state, visible) => {
        state.fontFamilyVisible = visible
    },
    'SET_DEFAULT_THEME': (state, theme) => {
        state.defaultTheme = theme
    },
    'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
        state.bookAvailable = bookAvailable
    },
    'SET_PROGRESS': (state, progress) => {
        state.progress = progress
    },
    'SET_SECTION': (state, section) => {
        state.section = section
    },
    'SET_IS_PAGINATING': (state, isPaginating) => {
        state.isPaginating = isPaginating
    },
    'SET_CURRENT_BOOK': (state, currentBook) => {
        state.currentBook = currentBook
    },
    'SET_NAVIGATION': (state, navigation) => {
        state.navigation = navigation
    },
    'SET_COVER': (state, cover) => {
        state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
        state.metadata = metadata
    },
    'SET_PAGINATE': (state, paginate) => {
        state.paginate = paginate
    },
    'SET_PAGELIST': (state, pagelist) => {
        state.pagelist = pagelist
    },
    'SET_OFFSETY': (state, offsetY) => {
        state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state, isBookmark) => {
        state.isBookmark = isBookmark
    }
  }
}

export default book
