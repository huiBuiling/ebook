const book = {
  state: {
    test: 1,
    fileName: 'aaaa',
    titleVisible: false,
    menuVisible: false,
    settingVisible: false
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
    'SET_SETTING_VISIBLE': (state, newSetting) => {
      state.settingVisible = newSetting
    }
  },
  actions: {
    setFileName: ({ commit }, newName) => {
      return commit('SET_FILE_NAME', newName)
    },
    setTitleVisible: ({ commit }, newTitle) => {
      return commit('SET_TITLE_VISIBLE', newTitle)
    },
    setMenuVisible: ({ commit }, newMenu) => {
      return commit('SET_MENU_VISIBLE', newMenu)
    },
    setSettingVisible: ({ commit }, newSetting) => {
      return commit('SET_SETTING_VISIBLE', newSetting)
    }
  }
}

export default book
