import consts from '../../common/const'
import {cookie} from 'vux'

export function httpInterceptor(request, next){
  var ticket = cookie.get(consts.adminTicketKey)
  if (ticket) {
    // request.params[consts.ticketKey] = ticket;
    request.headers.set(consts.adminTicketKey, ticket)
  }
  next((rsp) => {
    if (rsp.data.code !== consts.CODE_SUCC){
      if(window.vm.$vux){
        window.vm.$vux.loading.hide()
        window.vm.$vux.toast.text(rsp.data.message, 'bottom',2000)
      }else if(window.vm.$Message){
        if(rsp.data&&rsp.data.message){
          window.vm.$Message.error(rsp.data.message)
        }
      }
    }
  });
}
