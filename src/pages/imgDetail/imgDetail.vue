<template>
  <view>
      <!-- 用户信息 -->
      <view class="user_info">
          <view class="user_icon">
              <image :src="imgDetail.user.avatar" mode="widthFix"></image>
          </view>
          <view class="user_desc">
              <view class="user_name">{{imgDetail.user.name}}</view>
              <view class="user_time">{{imgDetail.atime}}</view>
          </view>
      </view>

      <!-- 高清大图 -->
      <swiper-action @swiperAction="swiper">
        <view class="high_img">
            <image :src="pic" mode="widthFix"></image>
        </view> 
      </swiper-action>
      

      <!-- 点赞和收藏 -->
      <view class="user_rank">
          <view class="rank">
              <text class="iconfont icon-z-like">{{imgDetail.rank}}</text>
          </view>
          <view class="collect">
              <text class="iconfont icon-shoucang">收藏</text>
          </view>
      </view>

      <!-- 专辑 -->
      <view class="album_wrap" v-if="album.length>0">
          <view class="album_title">相关</view>
          <view class="album_list">
              <view class="album_item" v-for="item in album" :key="item.id">
                  <view class="album_cover">
                      <image :src="item.cover" mode="aspectFill"></image>
                  </view>
                  <view class="album_info">
                      <view class="album_text">专辑</view>
                      <view class="album_name">{{item.name}}</view>
                      <text class="iconfont icon-youjiantou"></text>
                  </view>
              </view>
          </view>
      </view>

      <!-- 最热评论 -->
    <view class="comment hot" v-if="hot.length>0">
        <view class="comment_title">
            <text class="comment_text">最热评论</text>
        </view>
        <view class="comment_list">
            <view class="comment_item" v-for="item in hot" :key="item.id">
                <!-- 用户信息 -->
                <view class="comment_user">
                    <!-- 用户头像 -->
                    <view class="user_icon"><image :src="item.user.avatar" mode="widthFix"></image></view>
                    <!-- 用户名称 -->
                    <view class="user_name">
                        <view class="user_nickname">{{item.user.name}}</view>
                        <view class="user_time">{{item.atime}}</view>
                    </view>
                    <!-- 用户徽章 -->
                    <view class="user_badge">
                        <image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon"></image>
                    </view>
                </view>
                <!-- 评论数据 -->
                <view class="comment_desc">
                    <view class="comment_content">{{item.content}}</view>
                    <view class="comment_like">
                        <text class="iconfont icon-z-like">{{item.size}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>

    <!-- 最新评论 -->
    <view class="comment hot"  v-if="comment.length>0">
        <view class="comment_title">
            <text class="comment_text">最新评论</text>
        </view>
        <view class="comment_list">
            <view class="comment_item" v-for="item in comment" :key="item.id">
                <!-- 用户信息 -->
                <view class="comment_user">
                    <!-- 用户头像 -->
                    <view class="user_icon"><image :src="item.user.avatar" mode="widthFix"></image></view>
                    <!-- 用户名称 -->
                    <view class="user_name">
                        <view class="user_nickname">{{item.user.name}}</view>
                        <view class="user_time">{{item.atime}}</view>
                    </view>
                    <!-- 用户徽章 -->
                    <view class="user_badge">
                        <image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon"></image>
                    </view>
                </view>
                <!-- 评论数据 -->
                <view class="comment_desc">
                    <view class="comment_content">{{item.content}}</view>
                    <view class="comment_like">
                        <text class="iconfont icon-z-like">{{item.size}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>

    <!-- 下载图片 -->
    <view class="download" @click="handleDownload">
        <view class="download_btn">下载图片</view>
    </view>
  </view>
</template>

<script>
    import swiperAction from '@/components/swiperAction'
export default {
    components:{
        swiperAction
    },
    data(){
        return{
            imgDetail:{},
            pic:"",
            //专辑数据，数组
            album:[],
            //热门
            hot:[],
            //评论
            comment:[],
            // 图片的索引
            imgIndex: 0,
            // 图片数组
            imgList:[]
        }
    },
    onLoad(){
        const {imgList,imgIndex} = getApp().globalData;
        this.imgIndex = imgIndex
        this.imgList = imgList
        this.getData();
    },
    methods:{
        getData(){
        this.imgDetail = this.imgList[this.imgIndex];
        this.pic = this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',360)

        //获取图片详情的id
        this.getComments(this.imgDetail.id)
        },
        getComments(id){
            this.$request({
                url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
            })
            .then(res => {
                console.log('res',res)
                this.album = res.res.album
                this.hot = res.res.hot
                this.comment = res.res.comment
            })
        },
        swiper(dire){
            console.log('dire',dire)
            /*
            1、左滑：this.imgIndex ++
            2、右滑：this.imgIndex --
            3、判断是否越界
                dire === "left" && this.imgIndex < this.imgList.length-1
                dire === "right" && this.imgIndex > 0
            */
            if(dire === "left" && this.imgIndex < this.imgList.length-1){
                this.imgIndex++;
                this.getData();
            }else if(dire === "right" && this.imgIndex > 0){
                this.imgIndex--;
                this.getData();
            }else{
                uni.showToast({
                    title: '没有数据了',
                    icon: 'none',
                });
            }
        },
        
        // 下载图片
        async handleDownload(){
             uni.showLoading({
                title: '下载中'
            })

            // 将服务器文件下载到小程序内存中
            const result = await uni.downloadFile({url: this.imgDetail.img})
            console.log('resulet',result)
            const { tempFilePath } = result[1]

            // 将内存文件下载到本地
            const result2 = await uni.saveImageToPhotosAlbum({filePath: tempFilePath});
            console.log('result2',result2)

            uni.hideLoading();

            uni.showToast({
                title: '下载成功'
            })


            
        }
    }

}
</script>

<style lang="less" scoped>
.user_info {
    display: flex;
    padding: 10rpx;
  .user_icon {
      padding: 0 20rpx;
    image {
        width: 88rpx;
        border-radius: 50%;
    }
  }

  .user_desc {
    .user_name {
        color: #000;
        font-weight: 600;
    }

    .user_time {
        color: #ccc;
        font-size: 24rpx;
        padding: 10rpx 0;
    }

  }
}

.user_rank {
    display: flex;
    height: 80rpx;
    border-bottom: 5rpx solid #eee;
    font-size: 14rpx;
  .rank {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    .iconfont {
    font-size: 30rpx;
    }
  }

  .collect {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
   .iconfont {
    font-size: 30rpx;
    }
  }
}

.album_wrap {
    padding: 20rpx;
  .album_title {
      padding: 10rpx 0;
  }

  .album_list {
    .album_item {
        padding: 10rpx 0;
        display: flex;
        border-bottom: 10rpx solid #eee;
      .album_cover {
          flex: 1;
        image {
            width: 180rpx;
            height: 180rpx;

        }
      }

      .album_info {
          flex: 3;
          padding-left: 20rpx;
          position: relative;
        .album_text {
            width: 100rpx;
            height: 50rpx;
            background-color: #d52a7e;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }

        .album_name {
            padding: 10rpx 0;
            color: #888;
        }
        .iconfont{
            font-size: 40rpx;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10%;
            color: #000;
        }
      }
    }
  }
}

.comment.hot {
    padding: 10rpx; 
  .comment_title {
    padding: 10rpx;
    .comment_text {
        font-weight: 600;
        margin-left: 10rpx;
    }
  }

  .comment_list {
    .comment_item {
        border-bottom: 5rpx solid #eee;
        // 用户信息
      .comment_user {
          display: flex;
          padding: 20rpx 0;
        .user_icon {
            width: 15%;
          image {
              width: 90%;

          } 
        }

        .user_name {
            flex: 1;
          .user_nickname {
              color: #777;

          }

          .user_time {
              color: #ccc;
              font-size: 24rpx;
              padding: 5px;

          }
        }

        .user_badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
      }

      .comment_desc {
          display: flex;
          padding: 30rpx 0;
        .comment_content {
            flex: 1;
            padding-left: 15%;
            color: #000;
        }

        .comment_like {
            text-align: right;
          .iconfont {


          }
        }
      }
    }
  }
}

.download{
    height: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .download_btn{
        width: 90%;
        height: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #d52a7e;
        color: #fff;
        font-size: 50rpx;
        font-weight: 600;
        text-align: center;

    }
}
</style>