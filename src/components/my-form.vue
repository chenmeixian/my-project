<template>
  <view>
      <view>标题</view>
      <view class="slot-content">
        1111
          <slot></slot>
      </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .slot-content{
    width: 750RPX;
    height: 100px;
    background-color: aqua;
  }

</style>