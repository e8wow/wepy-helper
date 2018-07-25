let appData = getApp().globalData;
let app = getApp()
// let option = appData.entryOptions
// app.globalData.scene = decodeURIComponent(option.scene) ? decodeURIComponent(option.scene) : '' // 获取带参数二维码中的参数
function loginCheck(pageObj) {
    if (pageObj.onLoad) {
        let _onLoad = pageObj.onLoad;
        // 使用onLoad的话需要传递options
        pageObj.onLoad = function (options) {
            if (true) {//登录之后才能走通
                //获取页面实例，防止this劫持
                let currentInstance = getPageInstance();
                _onLoad.call(currentInstance, options);
            } else {
                // 跳转登录页面
            }
            // appData.promise.then((res) => {
            //   //获取页面实例，防止this劫持
            //   let currentInstance = getPageInstance();
            //   _onLoad.call(currentInstance, options);

            // }, () => {
            //   console.log(res)
            // });
        }
    }
    if (pageObj.onShow) {
        let _onShow = pageObj.onShow;
        pageObj.onShow = function () {
            appData.promise.then((res) => {
                //获取页面实例，防止this劫持
                let currentInstance = getPageInstance();
                // console.log(currentInstance)
                _onShow.call(currentInstance);
            }, () => {
                console.log(res)
            });
        }
    }
    return pageObj;
}

// 获取当前页面
function getPageInstance() {
    let pages = getCurrentPages();
    return pages[pages.length - 1];
}

exports.loginCheck = loginCheck;
