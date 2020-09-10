import Events from 'myevents';
var settings = localStorage.getItem('settings');

if ( typeof settings === 'string' ){

	try {
		settings = JSON.parse(settings);
	} catch(e){
		console.warn('Invalid settings: ' + e );
	}

}
if ( typeof settings !== 'object' || settings === null ) {
	settings = {};
}

export default {

	/**
	 * @property {string} textCase
	 */

	/**
	 * @property {boolean} darkMode
	 */

	/**
	 * @property {object} hilite
	 * @property {boolean} hilite.fill
	 * @property {string} hilite.color
	 */

	/**
	 * @property {boolean} gameTimer
	 */

	update(){
		localStorage.setItem('settings', JSON.stringify(settings) );
	},

	triggerAll(){
		for( let p in settings) {
			Events.emit( 'setting', p, settings[p] );
		}
	},

	getPath( key, ...params ) {

		let obj = settings[key];
		if ( !obj || typeof obj !== 'object') return null;

		let len = params.length-1;
		for( let i = 0; i < len; i++ ) {

			obj = obj[params[i]];
			if ( !obj || typeof obj !== 'object') {
				console.log('path not obj: ' + params[i] );
				return null;
			}

		}

		return obj[params.length-1];

	},
	setPath( key, ...params ) {

		let obj = settings[key];
		if ( obj === undefined || typeof obj !== 'object' ) {
			obj = settings[key] = {};
		}

		let value = params.pop();
		console.log('setting value: ' + value);

		let lenMinus = params.length-1;

		let sub = obj;
		for( let i = 0; i < lenMinus; i++ ) {

			let nxt = sub[params[i] ];
			if ( !nxt || typeof nxt !== 'object') {
				nxt = sub[params[i]] = {};
			}
			sub = nxt;


		}

		sub[params[lenMinus] ] = value;
		this.update();

		Events.emit( 'setting', key, obj );

		return value;

	},
	get(key){
		return settings[key];
	},

	set( key,value) {

		if ( settings[key] === value)return;

		settings[key] = value;
		this.update();

		Events.emit( 'setting', key, value );

		return value;

	}

}