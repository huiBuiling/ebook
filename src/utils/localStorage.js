import Storage from 'web-storage-cache'

const localStorage = new Storage()

/**
 * @author hui
 * @date 2019/5/31
 * @Description: localStorage:设置，获取，删除，清空
*/
export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function removeLocalStorage (key) {
  return localStorage.delete(key)
}

export function clearLocalStorage () {
  return localStorage.clear()
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：book对象
*/
export function setBookObject (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject (fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：主题背景
 */
export function saveTheme (fileName, theme) {
  setBookObject(fileName, 'theme', theme)
}

export function getTheme (fileName) {
  return getBookObject(fileName, 'theme')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：字体类型
 */
export function saveFontFamily (fileName, fontFamily) {
  setBookObject(fileName, 'fontFamily', fontFamily)
}

export function getFontFamily (fileName) {
  return getBookObject(fileName, 'fontFamily')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：字体大小
 */
export function saveFontSize (fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize)
}

export function getFontSize (fileName) {
  return getBookObject(fileName, 'fontSize')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：
 */
export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}

export function getLocale () {
  return getLocalStorage('locale')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：
 */
export function saveLocation (fileName, location) {
  setBookObject(fileName, 'location', location)
}

export function getLocation (fileName) {
  return getBookObject(fileName, 'location')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：
 */
export function saveBookmark (fileName, bookmark) {
  setBookObject(fileName, 'bookmark', bookmark)
}

export function getBookmark (fileName) {
  return getBookObject(fileName, 'bookmark')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：
 */
export function saveReadTime (fileName, theme) {
  setBookObject(fileName, 'time', theme)
}

export function getReadTime (fileName) {
  return getBookObject(fileName, 'time')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：阅读进度
 */
export function saveProgress (fileName, progress) {
  setBookObject(fileName, 'progress', progress)
}

export function getProgress (fileName) {
  return getBookObject(fileName, 'progress')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：
 */
export function saveNavigation (fileName, navigation) {
  setBookObject(fileName, 'navigation', navigation)
}

export function getNavigation (fileName) {
  return getBookObject(fileName, 'navigation')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：
 */
export function saveMetadata (fileName, metadata) {
  setBookObject(fileName, 'metadata', metadata)
}
export function getMetadata (fileName) {
  return getBookObject(fileName, 'metadata')
}

/**
 * @author hui
 * @date 2019/5/31
 * @Description: 保存，获取：
 */
export function saveCover (fileName, cover) {
  setBookObject(fileName, 'cover', cover)
}

export function getCover (fileName) {
  return getBookObject(fileName, 'cover')
}
