import consts from './const'
import {toKV, toMap, resetObject, setValues, selectionValue} from './utils'
import {getSelections} from './selections'
var loadedMixins = {
  data: function () {
    return {
      userInfo: {},
      userInfoLoaded: 0
    }
  },
  created: function () {
    this.$on(consts.loadedEvent, function (userInfo) {
      this.userInfo = userInfo
      this.userInfoLoaded = 1
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedEvent, userInfo)
      }
    })
    this.$on(consts.loadedFailEvent, function () {
      this.userInfo = {}
      this.userInfoLoaded = 0;
      var children = this.$children
      for (var i = 0; i < children.length; i++) {
        children[i].$emit(consts.loadedFailEvent)
      }
    })
  },
  mounted: function () {
    if (!window.vm) {
      return
    }
    if (window.vm.userInfoLoaded === 1) {
      this.$emit(consts.loadedEvent, window.vm.userInfo)
    } else if (window.vm.userInfoLoaded === 0) {
      this.$emit(consts.loadedFailEvent)
    }
  }
}

var common = {
  data: function () {
    return {
      consts: consts
    }
  },
  methods: {
    toKV: toKV,
    toMap: toMap,
    resetObject: resetObject,
    setValues: setValues,
    getSelections: getSelections,
    selectionValue: selectionValue,
    toContent: function (content) {
      if (!content || !content.replace)return ''
      content = content.replace(/\n\r/g, '<br/>')
      content = content.replace(/\r\n/g, '<br/>')
      content = content.replace(/\n/g, '<br/>')
      content = content.replace(/\r/g, '<br/>')
      return content
    }
  }
}

var verify = {
  data: function () {
    return {
      sendBtnText: '发送验证码',
      defaultDelay: 60,
      timeDelay: 0,
      sendBtnDisabled: false
    }
  },
  methods: {
    sendVerify: function () {
      this.timeDelay = this.defaultDelay
      this.sendBtnText = this.timeDelay + '秒后可重新发送'
      this.sendBtnDisabled = true
      var delay = () => {
        setTimeout(() => {
          this.timeDelay--
          if (this.timeDelay != 0) {
            this.sendBtnText = this.timeDelay + '秒后可重新发送'
            delay()
          } else {
            this.sendBtnText = '重新发送验证码'
            this.sendBtnDisabled = false
          }
        }, 1000)
      }
      delay()
    }
  }
}

export {loadedMixins, common, verify}
