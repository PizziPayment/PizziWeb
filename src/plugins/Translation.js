import * as TranslationJson from '../../Translate'
import { Store } from '../store/index.js'

export class TranslationPlugin {
  // eslint-disable-next-line no-useless-constructor
  constructor () {}
  getTranslation (index) {
    if (Store.state.defaultStore.language) {
      return this.getTranslationForLanguage(index, Store.state.defaultStore.language)
    }
    return index
  }

  getTranslationForLanguage (index, language) {
    if (!index || !TranslationJson ) {
      return index
    }
    if (typeof index !== 'string') {
      return index
    }
    const keys = Object.keys(TranslationJson)
    let item = keys.find(item => item === index)

    if (!item || !TranslationJson[item]) {
      item = keys.find(item => item.toUpperCase() === index.toUpperCase())
    }
    if (!item || !TranslationJson[item]) {
      return index
    }
    if (TranslationJson[item][language]) {
      return TranslationJson[item][language]
    }
    return TranslationJson[item]['en'] ? TranslationJson[item]['en'] : index
  }
}

const ret = function () {}

ret.install = function (Vue) {
  const global = new TranslationPlugin()
  Vue.global = global
  Object.defineProperty(Vue.prototype, '$translate', {
    get: function get () {
      return global
    }
  })
}

export default ret
