import {mix, each, url, rspHandler, filterNullParams} from './utils'
import consts from './const'
var listConfig = {
  url: '',
  dataList: [],
  total: 0,
  page: 1,
  pageSize: 10,
  params: {},
  selected: {},
  options: {},
  loadFlag:0,
  loading:false,
  showPage:false,
  hideLoadingFn:null
}
export default {
  methods: {
    initList: function (listNode, options) {
      if (!listNode) {
        listNode = this.list
      }
      listNode.options = mix({},listNode.options,options)
      var list = mix({}, listConfig, listNode)
      var self = this
      each(list, function (data, key) {
        self.$set(listNode, key, data)
      })
    },
    refreshList: function (page, listNode, isPost) {
      var self = this
      if (!listNode) listNode = this.list
      if (page) {
        listNode.page = page
      }
      var params = {}
      if (listNode.page) {
        params = {pageNumber: listNode.page, pageSize: listNode.pageSize}
      }
      params = mix(params, listNode.params)
      listNode.selected = {}
      if (!listNode.url) return
      var callback = rspHandler(function (data) {
        if (data instanceof Array) {
          listNode.dataList = data
          listNode.total = data.length
          listNode.showPage = false
        } else {
          listNode.dataList = data.rows
          listNode.total = data.total
          if(listNode.total > listNode.pageSize || (listNode.total <= listNode.pageSize && listNode.page !== 1)){
            listNode.showPage = true
          }else{
            listNode.showPage = false
          }
        }
        listNode.loadFlag = 2
        listNode.loading = false
        setTimeout(listNode.hideLoadingFn,1000)
        // self.$vux.loading.hide()
        // self.$forceUpdate()
        self.$emit(consts.listLoadEvent, listNode)
      })
      listNode.dataList = []
      // this.$vux.loading.show({
      //   text: '加载中'
      // })
      filterNullParams(params)
      listNode.loadFlag = 1
      listNode.loading = true
      listNode.hideLoadingFn = self.$Message.loading({
        content: '正在加载中...',
        duration: 0
      })
      listNode.dataList = []
      if (listNode.options.mothed) {
        this.$http.post(url(listNode.url), params, {
        }).then(callback)
      } else {
        this.$http.get(url(listNode.url), {params: params}).then(callback)
      }
    }
  }
}
