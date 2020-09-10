import Vue from 'vue';
import Main from 'ui/main.vue';
import Events from 'myevents';
import Settings from 'settings';

Vue.mixin({

	methods:{

		// get unique id for html element in a Vue component.
		elmId(name) { return name + this._uid; },

		getSettings(){
			return Settings;
		},
		getSetting( key ) {
			return Settings.get(key);
		},

		/**
		 * listen for system-level events.
		 * @param {string} evt
	 	 * @param {*} f
		 * @param {*} context
		 */
		addListener(evt, f, context) {
			Events.addListener(evt,f,context);
		},

		emit(...params){
			Events.emit.apply( Events, params );
		},

		removeListener(evt,f){
			Events.removeListener(evt,f);
		},
		/**
		 * Dispatch a system-level event.
		 * pause,save,reload,etc.
	 	 * @param  {...any} params
	 	*/
		dispatch( ...params ) {
			Events.emit.apply( Events, params );
		}

	}

});

const vm = new Vue({

	el:'#approot',
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