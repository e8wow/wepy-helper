import config from './config.js'
import checkRules from '../checkRules.js'
import md5 from '../md5.js'

/**
 * 自定义post函数，返回Promise
 * +-------------------
 * @param {String}      url 接口网址
 * @param {arrayObject} data 要传的数组对象 例如: {name: 'pmit', age:18}
 * +-------------------
 * @return {Promise}    promise 返回promise供后续操作
 */
let post = (
    url = '',
    type = 'POST',
    data = {},
    contentType = 'application/x-www-form-urlencoded'
) => {
    let promise = new Promise((resolve, reject) => {
        //init
        let that = this
        let postData = Object.assign({}, data)
        // 签名
        postData['appkey'] = config.appKey
        postData['sign'] = sign(data)
        /*
        此处可添加公共请求参数
        */
        //网络请求
        wx.request({
            url: config.requestUrl + url,
            data: postData,
            method: type,
            header: {
                'content-type': contentType
            },
            success(res) {
                //服务器返回数据
                if (res.data.code == 0) {
                    resolve(res.data.data)
                } else {
                    //返回错误提示信息
                    reject(res.data.debug)
                }
            },
            error(e) {
                reject('网络出错')
            }
        })
    })
    return promise
}

//签名方法
function sign(obj) {
    let sdic = Object.keys(obj).sort()
    let sortArr = []
    for (let ki in sdic) {
        if (!checkRules.isEmpty(obj[sdic[ki]])) {
            sortArr.push(`${sdic[ki]}=${obj[sdic[ki]]}`)
        }
    }
    //字典序排序
    let sortString = sortArr.join('&').toLocaleLowerCase()
    let stringSignTemp = `${config.appSecret}${sortString}${config.appSecret}`
    return md5(stringSignTemp).toLocaleLowerCase()
}

export default {
    post
}
