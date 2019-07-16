// 错误拦截,使用axios里面的拦截器拦截所有的错误
import { Message } from 'element-ui'
//  Message:引入element-ui里面的message方法

export default function ({ $axios, redirect }) {
    $axios.onError(err => {
        const { statusCode, message } = err.res.data;
        if (statusCode === 400) {
            Message.warning({ message })
        }
    })
}