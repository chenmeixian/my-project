<template>
	<view class="content">
		<view data-dia="1" @click="handle(1 , $event)">11</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				title: 'Hello'
			}
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
