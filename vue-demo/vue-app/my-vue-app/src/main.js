// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'

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
