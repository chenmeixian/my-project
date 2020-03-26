<template>
  <scroll-view class="album_scroll_view" scroll-y @scrolltolower="handletolower">
    <view class="album_swiper">
      <swiper indicator-dots autoplay circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb" mode="widthFix"></image>
        </swiper-item>
      </swiper>
    </view>

    <!-- 列表 -->
    <view class="album_list">
      <view class="album_item" v-for="item in album" :key="item.id" @click="enterDetail(item.id)">
        <view class="album_img">
          <image :src="item.cover" mode="aspectFill"></image>
        </view>
        <view class="album_info">
          <view class="album_name">{{item.name}}</view>
          <view class="album_desc">{{item.desc}}</view>
          <view class="album_btn">
            <view class="album_attention">关注</view>
          </view>
        </view>
      </view>
    </view>

  </scroll-view>
</template>

<script>
  export default {
    data() {
      return {
        params: {
          limit: 30,
          order: 'new',
          skip: 0
        },
        // 轮播图数字
        banner: [],
        // 列表数组
        album: [],

        //轮播图高度
        Height: '',

        //是否还有数据
        hasMore: true
      }
    },
    mounted() {

      // 设置页面标题
      uni.setNavigationBarTitle({ title: '专辑' });

      // 获取数据
      this.getList();
    },
    methods: {
      getList() {
        this.$request({
          url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
          data: this.params
        })
          .then(res => {
            // console.log(res)
            if (this.banner.length === 0) {
              this.banner = res.res.banner;
            }
            if (res.res.album.length === 0) {
              this.hasMore = false
              return;
            }
            this.album = [...this.album, ...res.res.album];
          })
          .catch(err => {
            console.log(err)
          })
      },

      // 滚动到底部，上拉加载，执行分页
      handletolower() {
        console.log('滚动到底部')
        if (this.hasMore) {
          this.params.skip += this.params.limit;
          this.getList()
        } else {
          uni.showToast({
            title: "没有数据了",
            icon: 'none'
          })
        }
      },

      // 进入详情页面
      enterDetail(id) {
        uni.navigateTo({
          url: '/pages/home/detail/detail?id='+id,
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .album_scroll_view {
    height: calc(100vh - 36px);
  }

  .album_swiper {
    swiper {
      width: 100%;
      height: 326.1rpx;

      image {
        width: 100%;
      }
    }
  }

  .album_list {
    padding: 10rpx;

    .album_item {
      padding: 10rpx 0;
      display: flex;

      .album_img {
        flex: 1;
        padding: 10rpx;

        image {
          width: 200rpx;
          height: 200rpx;

        }
      }

      .album_info {
        flex: 2;
        padding: 0 10rpx;
        overflow: hidden;

        .album_name {
          font-size: 30rpx;
          color: #000;
          padding: 10rpx 0;
        }

        .album_desc {
          padding: 10rpx 0;
          font-size: 24rpx;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .album_btn {
          padding: 10rpx;
          display: flex;
          justify-content: flex-end;

          .album_attention {
            color: #d52a7e;
            border: 1rpx solid #d52a7e;
            padding: 10rpx;
          }
        }
      }
    }
  }
</style>