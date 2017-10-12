import {url} from '../common/utils'

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
      window.vm.$http.get(selectionsUrl[key]).then((rsp)=> {
        window.selections[key] = rsp.data
        resolve(window.selections[key])
      },()=> {
        reject()
      })
    } else {
      resolve(window.selections[key])
    }
  })
  return promise
}

export {
  getSelections
}
