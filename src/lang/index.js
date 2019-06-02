import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import cn from './cn'

Vue.use(VueI18n)

const messages = {
  en,
  cn
}

// 创建默认源
const locale = 'cn'
const i18n = new VueI18n({
  locale,
  messages
})

export default i18n