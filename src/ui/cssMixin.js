export default {

	methods:{

		origin(x,y) { return 'transform-origin: '+x+ 'px ' + y + 'px;' },

		topLeft(x,y) {
			return 'left:'+x+'px;'+'top:'+y+'px;';
		},


		/**
		 * css rotate transform.
		 * @param {number} rotate=
		 */
		rotate( rotate ) {
			//return 'transform: '+ (rotate? 'rotate('+rotate+'deg) ':'') + 'translate('+x+'px, '+y+'px);';

			return 'transform rotate('+rotate+'deg);';
		},

		/**
		 * css transform with translate and rotate.
		 * @param {number} x
		 * @param {number} y
		 * @param {number} [rotate=0]
		 */
		transform( x, y, rotate=0 ) {
			//return 'transform: '+ (rotate? 'rotate('+rotate+'deg) ':'') + 'translate('+x+'px, '+y+'px);';

			return 'transform:' + 'translate('+x+'px,'+y+'px)'
			+ (rotate? ' rotate('+rotate+'deg);':';');
		},

		/**
		 *
		 * @param {*} str
		 * @param {*} value
		 * @param {string} unit
		 */
		pixProp( str, value, unit='px') { return str + ':'+value+ unit +';'; }

	}

}
