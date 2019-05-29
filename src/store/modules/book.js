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
  }
}

export default book
