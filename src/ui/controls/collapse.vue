<script>
export default {

	/**
 	* @property {boolean} toggleAfter - if true, open/close toggle comes after the label.
 	*/
	props:[ 'label', 'open', 'toggleAfter'],
	data() {
		return {
			isOpen:this.open||false
		};
	},
	methods: {
		toggle(){
			this.isOpen = !this.isOpen;
		}
	}

}
</script>

<template>
	<div class="collapsible">

	<div class="text-button" @click="toggle">

	<span :class="{'toggle-group':true, reverse:toggleAfter}">

		<slot name="toggle"><span :class="{ 'close-collapse-toggle':isOpen, 'open-collapse-toggle':!isOpen}"></span></slot>
		<slot name="label">{{ label }}</slot>

	</span>

	</div>

	<div class="collapse-content">
	<slot v-if="isOpen" />
	</div>

	</div>
</template>

<style scoped>

.close-collapse-toggle::after, .open-collapse-toggle::after {
	content: "⚙";
}

span.toggle-group {
	display:flex;
	flex-flow: row nowrap;
}
span.reverse {
	flex-direction: row-reverse;
}

</style>