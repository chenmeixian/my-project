const BASEURL = ""
export const request = (params) => {

    // 加载中
     uni.showLoading({
            title: "加载中"
        })

    return new Promise((reslove , reject) => {
          uni.request({
            ...params,
            success(res){
                reslove(res.data)
            },
            fail(err){
                reject(err)
            },
            complete(){
                uni.hideLoading();
            }
        })
    })
}