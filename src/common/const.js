export default {
  ticketKey: 'COFFEE_TOKEN',
  adminTicketKey: 'ADMIN_TOKEN',
  loginEvent: 'loginEvent',
  loadedEvent: 'loaded',
  loadedFailEvent: 'loadedFail',
  listLoadEvent: 'listLoadEvent',
  formErrorEvent: 'formErrorEvent',
  loginOutEvent: 'loginOutEvent',
  CODE_SUCC: 200,
  CODE_FAIL: 200000,
  CODE_ERROR: -999999,
  CODE_PARAM_ERR: 10002,
  CODE_VERIFI_ERROR: 10012,
  CODE_COOKIE_NULL: 'COOKIE_IS_NULL',
  statusMap: {
    effect: '',
    auditing: '审核中',
    auditNotPassed: '审核不通过'
  },
  statusUserMap: {
    effect: '普通用户',
    auditing: '审核中',
    auditNotPassed: '审核不通过',
    auditPassed: '企业服务商'
  }
}
