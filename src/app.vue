<template lang="jade">

div#app
  img(src="./assets/vue_logo.png")
  img(src="./assets/element_logo.svg")
  h1 {{ msg }}
  el-row(v-bind:gutter=20)
    el-col(v-bind:span=6 v-bind:offset=6)
      a.button1.el-button(href="http://www.vuejs.org/" target="_blank") Vue.js
    el-col(v-bind:span=6)
      a.el-button.button2(href="http://element.eleme.io/" target="_blank") Element-ui.js

</template>

<script>
import Vue from 'vue';
import {
    Row,
    Col,
    Button
} from 'element-ui';
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);

export default {
    name: 'app',
    data() {
        return {
            msg: 'A Sample App of Vue + Element-ui.js1'
        }
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
}

.button1 {
  background-color: #13CE66!important;
  color: white!important;
  text-decoration: none;
}

.button2 {
  background-color: #20A0FF!important;
  color: white!important;
  text-decoration: none;
}

h1 {
  font-weight: normal;
}

</style>
