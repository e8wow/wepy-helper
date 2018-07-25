const CHECKRULES = {
    isEmpty: function(str, msg) {
        // str：需校验的数据
        // msg：数据名称，用于提示错误信息；不传则不提示错误信息，可根据返回值自行提示
        let res = false
        if (str == null || str == undefined) {
            res = true
        } else if (str.toString().length == 0) {
            res = true
        }
        return res
    }
}

export default CHECKRULES
