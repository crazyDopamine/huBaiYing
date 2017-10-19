import consts from '../../common/const'
import {cookie} from 'vux'
import {url} from '../../common/utils'

export function httpInterceptor(request, next) {
  var ticket = cookie.get(consts.adminTicketKey)
  if (ticket) {
    request.headers.set(consts.adminTicketKey, ticket)
  }
  if (request.url.indexOf('http://') < 0 && request.url.indexOf('https://') < 0) {
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
    } else if (rsp.status == 200 && rsp.data && rsp.data.code == consts.CODE_COOKIE_NULL) {
      debugger
      window.vm.$emit(consts.loginOutEvent)
    } else {
      rsp.ok = false
      if (rsp.status != 200) {
        if (window.vm.$vux) {
          window.vm.$vux.loading.hide()
          window.vm.$vux.toast.text('服务器访问错误!', 'bottom', 2000)
        } else if (window.vm.$Message) {
          if (rsp.data && rsp.data.message) {
            window.vm.$Message.error('服务器访问错误!')
          }
        }
      } else {
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
