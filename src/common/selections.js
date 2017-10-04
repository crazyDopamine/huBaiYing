import {url, rspHandler} from '../common/utils'

window.selections = {}

var selectionsUrl = {
  city: 'city/getAllCity',
  business: 'business/getAll',
}

var getSelections = function (key) {
  var promise = new Promise(function (resolve, reject) {
    if (!window.selections[key]) {
      if (!selectionsUrl[key]) {
        window.vm.$Message.error('key无选项')
        reject()
        return
      }
      window.vm.$http.get(url(selectionsUrl[key])).then(rspHandler(function (data) {
        window.selections[key] = data
        resolve(window.selections[key])
      }))
    } else {
      resolve(window.selections[key])
    }
  })
  return promise
}

export {
  getSelections
}
