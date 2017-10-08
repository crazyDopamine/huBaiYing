import {dateFormat, numberComma, numberPad, numberRandom} from 'vux'

var selectionsFilter = function (value, selectionsMap ,descField) {
  if (selectionsMap && selectionsMap[value]) {
    return descField?selectionsMap[value][descField]:selectionsMap[value].desc
  } else {
    return value
  }
  // if (window.dicLoaded[code] === 2 && window.dicMapMap[code][value]) {
  //   return window.dicMapMap[code][value].desc
  // } else if(window.dicLoaded[code] === 1){
  //   return value
  // } else{
  //   if(!window.vm)return value
  //   window.vm.$on('selection-'+code,function(){
  //     vm.$forceUpdate()
  //   })
  //   selections(code).then((data)=>{
  //     window.vm.$emit('selection-'+code)
  //   })
  // }
  // return value
}
export default {
  install: function (Vue) {
    Vue.filter('date', function (date, format) {
      if (!format) {
        format = 'YYYY-MM-DD'
      }
      return dateFormat(date, format)
    })
    Vue.filter('numberComma', function (num, length) {
      return numberComma(num, length)
    })
    Vue.filter('number', function (num, length) {
      if (isNaN(Number(num))) {
        return ''
      } else {
        return Number(num).toFixed(length)
      }
    })
    Vue.filter('selections', selectionsFilter)
    var defaultImg = '/static/imgs/img-default.jpg'
    var imgFilter = function(src, type){
      var zipImgDic = window.baseUrl + 'breviary/'
      var bigImgDic = window.baseUrl + 'upload/'
      if (!src)return defaultImg
      if (src.indexOf('http') >= 0) {
        return src
      } else if (type == 1) {
        return bigImgDic + src
      } else {
        return zipImgDic + src
      }
    }
    Vue.filter('img', imgFilter)
    Vue.filter('movie', function (src, type) {
      return imgFilter(src,1)
    })
    Vue.filter('localFile', function (file) {
      if(file){
        return 'static/'+file;
      }else{
        return ''
      }
    })
  }
}
