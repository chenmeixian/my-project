<template>
  <scroll-view @scrolltolower="handletolower" scroll-y class="recommend-view" v-if="recommends.length>0">
     <!-- 推荐-->
     <view class="recommend-wrap">
      <view class="recommend-item" v-for="item in recommends" :key="item.id" @click="enterDetail(item.target)">
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
     </view>

     <!-- 月份 -->
     <view class="months-wrap">
       <view class="monthes-title">
          <view class="monthes-title-info">
            <view class="mmonthes-info">
              <text>{{monthes.DD}} / </text>
              {{monthes.MM}} 月
            </view>
            <view class="monthes-text">{{monthes.title}}</view>
          </view>
          <view class="monthes-title-more">更多 > </view>
       </view>
       <view class="monthes-content">
        <view class="monthes-item" v-for="(item,index) in monthes.items" :key="item.id">
          <go-detail :list="monthes.items" :index="index">
            <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
          </go-detail>
        </view>
       </view>
     </view>

     <!-- 热门 -->
    <view class="hots-wrap">
       <view class="hots-title">
         <text>热门</text>
       </view>
       <view class="hots-content">
        <view class="hot-item" v-for="(item,index) in hots" :key="item.id">
          <go-detail :list="hots" :index="index">
          <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
       </view>
     </view>
  </scroll-view>
</template>

<script>
  import moment from "moment";
  import goDetail from '@/components/goDetail';
export default {
  components:{
    goDetail
  },
  data(){
    return{
      // 推荐列表
      recommends:[],
      monthes: {},
      //热门列表
      hots: [],
      params:{
        //获取几条
        limit: 30,
        // 关键字
        order: "hot",
        // 跳过几条
        skip: 0
      },
      // 加载是否还有数据
      hasMore: true
    }
  },
  
  mounted(){

    // 设置页面标题
    uni.setNavigationBarTitle({title: '推荐'});

     this.getRequest();
    },
  methods:{
    // 接口请求
    getRequest(){
      this.$request({
      url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
      data:{
        ...this.params
      }
    }).then(res => {
      if(res.res.vertical.length === 0){
        this.hasMore = false;
        return;
      }
      if(this.recommends.length == 0){
      this.recommends = res.res.homepage[1].items;
      this.monthes = res.res.homepage[2];
      this.monthes.MM = moment(this.monthes.stime).format("MM");
      this.monthes.DD = moment(this.monthes.stime).format("DD");
      // console.log(this.monthes)
      }
      // console.log(res.res)
      //获取热门数据
      this.hots =[...this.hots , ...res.res.vertical] ;

    })
    },
    // 滚动底部请求新数据
    handletolower(){
      if(this.hasMore){
      this.params.skip += this.params.limit;
      this.getRequest();
      }else{
        uni.showToast({
          title: "没有数据了",
          icon:  "none"
        })
      }
    },

    // 进入专辑详情
    enterDetail(id){
      uni.navigateTo({
          url: '/pages/home/detail/detail?id='+id,
        })
    }
  }

}
</script>

<style lang="less" scoped>
.recommend-view{
  height: calc(100vh - 36px);
}
  .recommend-wrap{
    display: flex;
    flex-wrap: wrap;
    .recommend-item{
      width: 50%;
      border: 3rpx solid #fff;
    }
  }

  .months-wrap{
    .monthes-title{
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
      .monthes-title-info{
        font-size: 30rpx;
        font-weight: 600;
        color: #d52a7e;
        display: flex;
        .mmonthes-info{
          text{
            font-size: 36rpx;
          }
        }
        .monthes-text{
          font-size: 34rpx;
          color: #666;
          margin-left: 30rpx;
        }

      }
      .monthes-title-more{
        color:  #d52a7e;
        font-size: 24rpx;

      }

    }
    .monthes-content{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .monthes-item{
        width: 33.33%;
        border: 3rpx solid #fff
      }
    }
  }

   .hots-wrap {
    .hots-title {
      padding: 20rpx;
      text{
        border-left: 20rpx solid #d52a7e;
        padding-left: 20rpx;
        font-size: 30rpx;
        font-weight: 600;
      }
      
  }
    .hots-content {
      display: flex;
      flex-wrap: wrap ;
      .hot-item{
        width: 33.33%;
        border: 5rpx solid #fff;
      }
  }
}
</style>