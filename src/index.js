import Vue from 'vue';
import Main from 'ui/main.vue';

Vue.mixin({

});

const vm = new Vue({

	el:'#approot',
	components:{
		Main
	},
	data(){

		return {

			/**
			 * Update renderKey to force refresh..
			 */
			renderKey:1
		};

	},
	created(){

	},
	methods:{

	},
	render( createElm ){
		return createElm( Main, { key:this.renderKey } )
	}


});