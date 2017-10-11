import {dateFormat, numberComma, numberPad, numberRandom} from 'vux'
import {selectionValue} from './utils'

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
    Vue.filter('selections', selectionValue)
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
