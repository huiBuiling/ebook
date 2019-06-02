const actions = {
  setFileName: ({ commit }, newName) => {
    return commit('SET_FILE_NAME', newName)
  },
  // visible
  setTitleVisible: ({ commit }, newTitle) => {
    return commit('SET_TITLE_VISIBLE', newTitle)
  },
  setMenuVisible: ({ commit }, newMenu) => {
    return commit('SET_MENU_VISIBLE', newMenu)
  },
  setSettingVisible: ({ commit }, key) => {
    return commit('SET_SETTING_VISIBLE', key)
  },
  // 字体
  setDefaultFontSize: ({ commit }, defaultSize) => {
    return commit('SET_DEFAULT_FONT_SIZE', defaultSize)
  },
  setFontFamilyVisible: ({ commit }, visible) => {
    return commit('SET_FONT_FAMILY_VISIBLE', visible)
  },
  setDefaultFontFamily: ({ commit }, font) => {
    return commit('SET_DEFAULT_FONT_FAMILY', font)
  },
  setDefaultTheme: ({ commit }, theme) => {
    return commit('SET_DEFAULT_THEME', theme)
  },
  //
  setBookAvailable: ({ commit }, bookAvailable) => {
    return commit('SET_BOOK_AVAILABLE', bookAvailable)
  },
  // 进度
  setProgress: ({ commit }, progress) => {
    return commit('SET_PROGRESS', progress)
  },
  setSection: ({ commit }, section) => {
    return commit('SET_SECTION', section)
  },
  setIsPaginating: ({ commit }, isPaginating) => {
    return commit('SET_IS_PAGINATING', isPaginating)
  },
  setCurrentBook: ({ commit }, book) => {
    return commit('SET_CURRENT_BOOK', book)
  },
  setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
  setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
  setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
  setPaginate: ({ commit }, paginate) => {
    return commit('SET_PAGINATE', paginate)
  },
  setPagelist: ({ commit }, pagelist) => {
    return commit('SET_PAGELIST', pagelist)
  },
  setIsBookmark: ({ commit }, isBookmark) => {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
  setOffsetY: ({ commit }, offsetY) => {
    return commit('SET_OFFSETY', offsetY)
  }
}

export default actions
