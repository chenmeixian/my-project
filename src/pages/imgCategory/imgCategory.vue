<template>
  <view>
    <view class="category_tab">
      <view class="category_tab_title">
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
      <view class="category_tab_content">
            <view class="cate_item" v-for="item in vertical" :key="item.id">
              <image :src="item.thumb" mode="widthFix"></image>
            </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {uniSegmentedControl} from '@dcloudio/uni-ui'
export default {
  components:{
    uniSegmentedControl,
  },
  data(){
    return{
           items: ["最新" , "热门"],
           current: 0,
           params:{
             limit: 30,
             skip: 0,
             order: "new"
           },
           // 
           id:0,
           // 页面显示的列表数据
           vertical: [],
    }
  },
  onLoad(options){
    console.log('options',options);
    this.id = options.id
    this.getData()
  },
  methods:{
    onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }

            // 判断【最新或热门】
            if(this.current === 0){
              this.params.order = "new"
            }else{
              this.params.order = "hot"
            }
            // 点击获取数据
            this.getData()
        },
        getData(){
          this.$request({
            url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
            data: this.params
          })
          .then( res => {
            console.log('res',res)
            this.vertical = res.res.vertical
          })
        }
  },
}
</script>

<style lang="less" scoped>
  .category_tab{
    .category_tab_title{
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

    .category_tab_content{
      display: flex;
      flex-wrap: wrap;
      .cate_item{
        width: 33.33%;
        border: 5rpx solid #fff;
      }
    }
  }
  
  </style>