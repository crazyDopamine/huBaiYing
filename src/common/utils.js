/**
 * Created by dongwei on 2017/5/15.
 */

/**
 * 深度拷贝
 * @returns {*}
 */
import consts from './const'
var mix = function () {
  var argu = arguments
  if (argu.length <= 0) return {}
  var obj = argu[0]
  if (!obj || typeof obj !== 'object') obj = {}
  var keys, key
  for (let i = 1; i < argu.length; i++) {
    if (argu[i] && argu[i] instanceof Array) {
      if (!(obj instanceof Array)) {
        obj = []
      }
      for (let k = 0; k < argu[i].length; k++) {
        if (typeof argu[i][k] === 'object') {
          obj.push(mix({}, argu[i][k]))
        } else {
          obj.push(argu[i][k])
        }
      }
    } else if (argu[i] && typeof argu[i] === 'object') {
      keys = Object.keys(argu[i])
      for (let j = 0; j < keys.length; j++) {
        key = keys[j]
        if (key === undefined) continue
        if (typeof argu[i][key] === 'object') {
          obj[key] = mix(obj[key], argu[i][key])
        } else {
          obj[key] = argu[i][key]
        }
      }
    }
  }
  return obj
}

var each = function (array, callback) {
  if (array instanceof Array) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i)
    }
  } else if (typeof array === 'object') {
    var keys = Object.keys(array)
    for (let i = 0; i < keys.length; i++) {
      callback(array[keys[i]], keys[i])
    }
  }
}

var toNV = function (array, valueField, labelField) {
  if (!valueField) valueField = 'id'
  if (!labelField) labelField = 'name'
  var result = []
  each(array, function (data, index) {
    result.push({value: data[valueField], name: data[labelField]})
  })
  return result
}

var toKV = function (array, valueField, labelField) {
  if (!valueField) valueField = 'id'
  if (!labelField) labelField = 'name'
  var result = []
  each(array, function (data, index) {
    result.push({key: data[valueField], value: data[labelField]})
  })
  return result
}

var toVL = function (array, valueField, labelField) {
  if (!valueField) valueField = 'id'
  if (!labelField) labelField = 'name'
  var result = []
  var item = {}
  each(array, function (data, index) {
    item = {value: data[valueField], label: data[labelField], data: data}
    if (data.children) {
      item.children = toVL(data.children, valueField, labelField)
    }
    result.push(item)
  })
  return result
}

var toMap = function (array, valueField) {
  if (!valueField) valueField = 'id'
  var result = {}
  each(array, function (data, index) {
    result[data[valueField]] = data
  })
  return result
}

var url = function (url) {
  if (!url) url = ''
  if (url.indexOf('http://') < 0) {
    return window.baseUrl + url
  } else {
    return url
  }
}

var rspHandler = function (callback, errorCallback) {
  return function (rsp) {
    var data = rsp.data
    if (data.code === consts.CODE_SUCC) {
      callback(data.data)
    } else {
      if (window.vm.$vux) {
        window.vm.$vux.toast.text(data.message, 'bottom')
      } else if (window.vm.$Message) {
        window.vm.$Message.error(data.message);
      }
      if (errorCallback) errorCallback(data)
    }
  }
}

var filterNullParams = function (obj) {
  if (typeof obj !== 'object')return
  each(obj, function (value, key) {
    if (value === '' || value === null) {
      delete obj[key]
    }
  })
}

var resetObject = function (obj, isDeep) {
  each(obj, function (value, key) {
    if (obj[key] instanceof Array) {
      obj[key] = [];
    } else if (typeof obj[key] == 'object') {
      if (isDeep) {
        resetObject(obj[key])
      } else {
        obj[key] = {};
      }
    } else {
      obj[key] = '';
    }
  });
}

var setValues = function (form, values) {
  each(form, function (value, key) {
    if(values[key]!=undefined){
      form[key] = values[key]
    }
  })
}

// window.dicMap = {}
// window.dicMapMap = {}
// window.dicLoaded = {}
// var selections = function (code) {
//   var promise = new Promise(function (resolve, reject) {
//     if (!window.dicLoaded[code]) {
//       window.dicLoaded[code] = 1
//       window.vm.$http.get(url('dataDictionary/getByCode/' + code)).then(rspHandler(function (data) {
//         window.dicMap[code] = data
//         window.dicMapMap[code] = {}
//         data.each((item, index) => {
//           window.dicMapMap[code][item.value] = item
//         })
//         window.dicLoaded[code] = 2
//         resolve(window.dicMap[code])
//       }))
//     } else {
//       resolve(window.dicMap[code])
//     }
//   })
//   return promise
// }


Array.prototype.contains = function (item) {
  var result = false
  each(this, (data, index) => {
    if (data == item) result = true
  })
  return result
}
Array.prototype.each = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i)
  }
}
// Object.prototype.each = function (callback) {
//   var keys = Object.keys(this)
//   for (let i = 0; i < keys.length; i++) {
//     callback(this[keys[i]],keys[i],i)
//   }
// }
// if (!Object.prototype.adfasfas) {
//   Object.prototype.adfasfas = function () {
//     var keys = Object.keys(this)
//     var item;
//     for (let i = 0; i < keys.length; i++) {
//       item = this[keys[i]]
//       if (item instanceof Array) {
//         item.clear()
//       } else if (typeof item == 'object') {
//         item.clear()
//       } else if (typeof item == 'string') {
//         item = ''
//       } else if (typeof item == 'number') {
//         item = 0
//       } else if (typeof item == 'boolean') {
//         item = false
//       } else {
//         item = ''
//       }
//     }
//   }
// }


/**
 * 获取search参数
 * @returns {{}}
 */
var getHashObj = function () {
  var qs = location.hash.length > 0 && location.hash.indexOf("?") > 0 ? location.hash.substr(location.hash.indexOf("?") + 1, location.hash.length) : '',
    args = {},
    items = qs.length > 0 ? qs.split('&') : [],
    item = null, name = null, value = null, i = 0, len = items.length;
  for (i = 0; i < len; i++) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
}

var getSearchObj = function () {
  var qs = location.search.length > 0 ? location.search.substr(1) : '',
    args = {},
    items = qs.length > 0 ? qs.split('&') : [],
    item = null, name = null, value = null, i = 0, len = items.length;
  for (i = 0; i < len; i++) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);

    if (name.length) {
      args[name] = value;
    }
  }
  return args;
}

var getQuery = function (obj) {
  return mix({}, getHashObj(), getSearchObj(), obj)
}


export {
  mix,
  each,
  toNV,
  toKV,
  toVL,
  url,
  rspHandler,
  toMap,
  filterNullParams,
  getQuery,
  resetObject,
  setValues
}
