<template>
  <view
    @touchstart="handleTouchstart"
    @touchend="handleTouchend">
      
      <slot></slot>
  </view>
</template>

<script>
export default {
    data(){
        return{
            // 按下的时间
            startTime: 0,
            // 按下的坐标
            startX: 0,
            startY: 0,
        }
    },
    methods:{
        // 点击屏幕回调
        handleTouchstart(event){
            this.startTime = Date.now();
            this.startX = event.changedTouches[0].clientX;
            this.startY = event.changedTouches[0].clientY;
        },
        // 离开屏幕回调
        handleTouchend(event){
            const endTime = Date.now();
            const endX = event.changedTouches[0].clientX;
            const endY = event.changedTouches[0].clientY;

            if(endTime - this.startTime > 2000){
                return;
            }

            //滑动方向
            let direction = "";

            // 确定移动有效距离和方向(左右滑动，要求y轴滑动小于10)
            if(Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY) < 10){
                //滑动方向
                direction = (endX - this.startX) > 0 ? "right" : "left" ;
            }else{
                return;
            }

            // 传给父组件移动方向
            this.$emit("swiperAction" ,direction )
        }
    }

}
</script>

<style>

</style>