import consts from '../../common/const'
import {cookie} from 'vux'
import {url} from '../../common/utils'

export function httpInterceptor(request, next){
  var ticket = cookie.get(consts.ticketKey)
  if (ticket) {
    // request.params[consts.ticketKey] = ticket;
    request.headers.set(consts.ticketKey, ticket)
  }
  if(request.url.indexOf('http://')<0&&request.url.indexOf('https://')<0){
    request.url = url(request.url)
  }
  next((rsp) => {
    if (rsp.status == 200 && rsp.data && rsp.data.code == consts.CODE_SUCC) {
      if(request.method.toLowerCase() == 'post'){
        if (window.vm.$vux) {
          window.vm.$vux.loading.hide()
          window.vm.$vux.toast.text(rsp.data.message, 'bottom', 2000)
        } else if (window.vm.$Message) {
          if (rsp.data && rsp.data.message) {
            window.vm.$Message.success(rsp.data.message)
          }
        }
      }
      rsp.success = true
      rsp.data = rsp.data.data
      rsp.ok = true
    }else{
      rsp.ok = false
      if(rsp.status != 200){
        if (window.vm.$vux) {
          window.vm.$vux.loading.hide()
          window.vm.$vux.toast.text('服务器访问错误!', 'bottom', 2000)
        } else if (window.vm.$Message) {
          if (rsp.data && rsp.data.message) {
            window.vm.$Message.error('服务器访问错误!')
          }
        }
      }else {
        if (window.vm.$vux) {
          window.vm.$vux.loading.hide()
          window.vm.$vux.toast.text(rsp.data.message, 'bottom', 2000)
        } else if (window.vm.$Message) {
          if (rsp.data && rsp.data.message) {
            window.vm.$Message.error(rsp.data.message)
          }
        }
      }
    }
  });
}
