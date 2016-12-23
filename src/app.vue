<template lang="jade">


div#app
	img(src="./assets/vue_logo.png")
	img(src="./assets/element_logo.svg")
	h1 {{ msg }}
	br
	a(href="http://element.eleme.io/" target="_blank")
		el-button(style="background-color:#13CE66;color:white") Vue.js
	&nbsp;&nbsp;
	a(href="http://element.eleme.io/" target="_blank")
		el-button(style="background-color:#20A0FF;color:white") Element-ui.js

</template>

<script>
import Vue from 'vue';
import { Button } from 'element-ui';
Vue.component(Button.name, Button);

export default {
	name: 'app',
	data() {
		return {
			msg: 'A Sample App of Vue + Element-ui.js'
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
	color: #2c3e50;
	margin-top: 60px;
}

h1,
h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
