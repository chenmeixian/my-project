<template>
	<view class="content">
		<view data-dia="1" @click="handle(1 , $event)">11</view>
		<my-form>
			<button>slot</button>
		</my-form>
	</view>
</template>

<script>
	import myForm from '@/components/my-form.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			myForm
		},
		onLoad() {

		},
		methods: {
			handle(index , $event){
				console.log($event)
			}

		}
	}
</script>

<style lang= 'less'>
	.content {
		text-align: center;
		height: 400rpx;
		.one{
			color: #ccc;
		}
	}
</style>
