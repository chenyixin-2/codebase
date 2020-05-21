// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'
import VeLine from 'v-charts/lib/line.common'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!!!!!!!!!!!!!!!!!!!!++++++++++++++'
  }
  // router,
  // template: '<App/>',
  // components: { App }
})

new Vue({
  el: '#app-2',
  data: {
    message2: 'You hover over on ' + new Date().toLocaleTimeString()
  }
})

new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      {text: 'A'},
      {text: 'B'},
      {text: 'C'}
    ]
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: function () {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  components: { VeLine }
})
