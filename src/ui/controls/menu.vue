<script>

export default {

	props:['value', 'items', 'display', 'keyProp'],
	data(){
		return {
			pKey:this.keyProp|| ( this.display||'name' ),
			myItems:this.items
		};
	},
	computed:{
		current:{
			get(){
				return this.value;
			},
			set(v) {
				if ( this.current != v ) this.$emit( 'changed', v );
				this.$emit( 'input', v );
			}
		}
	},
	methods:{

		clearActive() {
			this.current = null;
		},

		setActive( it ) {
			this.current = it;
		}

	}

}

</script>
<template>
	<div class="vue-menu">

		<div class="vue-menu-pane">

		<div class="vue-menu-item" v-for="(it) in items" :key="it[ pKey ]">
			
			<slot name="menu-item" v-bind:item="it">
			<h3 class="text-button" v-if="it !== current" @click="setActive(it)" :key="it[pKey]"> <u> {{ it[display] }} </u></h3>
			<h3 class="text-button" v-else :key="it[pKey]"> {{ it[display] }} </h3>
			</slot>

		</div>

		</div>

		<!-- NOTE: putting css-class on slot does not appear to carry over -->
		<div class="vue-menu-selection" v-if="current">
		<slot name="menu-selection" v-bind:item="current">
			{{current}}
		</slot>
		</div>

	</div>
</template>