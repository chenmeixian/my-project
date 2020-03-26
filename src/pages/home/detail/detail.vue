<template>
<view>
  <!-- 专辑背景 -->
  <view class="album_bg">
    <image :src="album.cover" mode="widthFix"></image>
    <view class="album_info">
      <view class="album_name">{{album.name}}</view>
      <view class="album_btn">关注专辑</view>
    </view>
  </view>

  <!-- 专辑作者 -->
  <view class="album_author">
    <view class="album_author_info">
      <image mode="widthFix" :src="album.user.avatar"></image>
      <view class="author_name">{{album.user.name}}</view>
    </view>
    <view class="album_author_desc">
      <text>{{album.desc}}</text>
     </view>
  </view>

  <!-- 列表    -->
  <view class="album_list">
    <view class="album_item"
    v-for="(item,index) in wallpaper"
    :key="item.id">
    <go-detail :list="wallpaper" :index="index">
      <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
    </go-detail>
    </view>
  </view>
</view>
</template>

<script>
  import goDetail from '@/components/goDetail';
export default {
  components:{
    goDetail
  },
  data(){
    return{
      id: '',
      params:{
        limit: 30,
        order: 'new',
        skip: 0,
        first: 1
      },
      album: {},
      wallpaper: [],
      hasMore: true
    }
  },
  onReachBottom(){
    if(this.hasMore){
      this.params.first = 0;
      this.params.skip += this.params;
      this.getList();
    }else{
       uni.showToast({
           title: "没有更多数据了",
           icon: "none"
         })
    }
    
  },
  onLoad(options) {
   this.id = options.id
   console.log('options',options)
   this.getList()
  },
  methods: {
    getList(){
      this.$request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params
      })
      .then(res => {
        console.log('res',res)
        if(Object.keys(this.album).length === 0){
          this.album = res.res.album
        }
       if(res.res.wallpaper.length === 0){
         this.hasMore = false
         uni.showToast({
           title: "没有更多数据了",
           icon: "none"
         })
         return;
       }
      this.wallpaper = [...this.wallpaper, ...res.res.wallpaper]
      })
      .catch(err => {
        console.log('err',err)
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .album_bg {
    position: relative;
    .album_info {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;
      color: #fff;
      padding: 15rpx;
      .album_name {
        font-size: 40rpx;

      }
      .album_btn {
        background-color: #d52a7e;
        width:152rpx;
        height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10rpx;
      
        

    }
  }
}
.album_author {
  padding: 10rpx;
  .album_author_info {
    padding: 10rpx 0;
    display: flex;
    image {
      width: 50rpx;
    }

    .author_name {
      color: #000;
      margin-left: 15rpx;
    }
  }

  .album_author_desc {

  }
}
.album_list {
  display: flex;
  flex-wrap: wrap;
  .album_item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      height: 180rpx;
    }
  }
}
</style>