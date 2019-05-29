const actions = {
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

export default actions
