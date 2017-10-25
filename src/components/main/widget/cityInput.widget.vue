<template>
  <div class="city-input-container">
    <Cascader :data="selections" v-model="cityId"></Cascader>
  </div>
</template>
<script type="es6">
  // import {kvValue} from '../../../common/utils'
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        selections: [],
        cityId: []
      }
    },
    methods: {

    },
    created: function () {
      this.getSelections('city').then((data)=> {
        this.selections = data
        if (this.value) {
          this.cityId = this.value.toString().split(',')
        } else {
          this.cityId = []
        }
      })
      this.$watch('value', function (v) {
        if (this.value) {
          // this.cityId = kvValue(this.value, this.selections, 'value')
          this.cityId = this.value.toString().split(',')
        } else {
          this.cityId = []
        }
      })
      this.$watch('cityId', function (v) {
        if (v && v.length > 0) {
          this.$emit('input',v.toString())
        }
      })
    }
  }
</script>
