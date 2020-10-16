import Vue from 'vue'
import * as VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

new Vue({
  el: '#app',
  name: 'LastRowFixed',
  data: {
    menuVisible: false
  }
})

// var myList = [
//   { id: 0, name: "hello" },
//   { id: 1, name: "foo" },
//   { id: 2, name: "bar" }
// ]

// var draggable = new Vue({
//   el: "#drag-demo",
//   data: {
//     myArray: myList
//   },
//   methods: {
//     onEnd: function(e) {
//       console.log(e);
//     },
//     handleOnChange: function(e) {
//       console.log(e);
//     },
//   }
// });
