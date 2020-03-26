<template>
<view>
  <view class="home_tab">
      <view class="home_tab_title">
        <view class="tab_inner">
        <uni-segmented-control 
          :current="current" 
          :values="items"
          @clickItem="onClickItem" 
          style-type="text" 
          active-color="#d4237a">
        </uni-segmented-control>
        </view>
        <view class="iconfont icon-sousuo"></view>
       
      </view>
      <view class="home_tab_content">
            <view v-show="current === 0">
               <recommend></recommend>
            </view>
            <view v-show="current === 1">
               <category></category>
            </view>
            <view v-show="current === 2">
                 <news></news>
            </view>
             <view v-show="current === 3">
                <album></album>
            </view>
      </view>
    </view>
</view>
</template>

<script> 
import {uniSegmentedControl} from '@dcloudio/uni-ui'

import album   from './children/album.vue' 
import category   from './children/category.vue'
import recommend   from './children/recommend.vue' 
import news   from './children/news.vue' 

export default {
  components:{
    uniSegmentedControl,
    album,
    category,
    recommend,
    news
  },
  data(){
    return{
           items: ['推荐','分类','最新','专辑'],
           current: 1
    }
  },
  methods:{
    onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
  },

  // 页面的下拉刷新
  onPullDownRefresh(){
    console.log('下拉刷新',)
  }
}
</script>

<style lang="less" scoped>
.home_tab{
  .home_tab_title{
    position: relative;
    .tab_inner{
      width: 60%;
      margin: 0 auto;
      }
    .icon-sousuo{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
      font-size: 50rpx;
   }
  }
  .home_tab_content{

  }
}

</style>