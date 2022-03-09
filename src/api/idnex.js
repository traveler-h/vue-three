import axios from 'axios';
const request = axios.create({
    baseURL: 'http://api.cpengx.cn/metashop/api'
})

request.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data
    } else {
        return response
    }
}, (err) => {
    return Promise.reject(err)
})

export const getHomepage = () => {
    return request({
        method: 'GET',
        url: '/homepage'
    })
}

export const getProduct = () => {
    return request({
        method: 'GET',
        url: '/products'
    })
}
