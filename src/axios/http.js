import axios from 'axios'
import local from '../utils/storage'
axios.defaults.timeout = 5000

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  axios.defaults.baseURL = 'http://81.68.198.45/api.php/' // 这里是线上api请求地址
}
// http request 拦截器
axios.interceptors.request.use((config) => {
  console.log('请求参数：', config)
  const $user = local.getUser()
  if ($user) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = $user.access_token
  }
  return config
}, (error) => {
  Promise.reject(error)
}
)

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      // router.push({
      //   path: '/login',
      //   querry: {redirect: router.currentRoute.fullPath}// 从哪个页面跳转
      // })
    }
    console.log('返回结果：', response)
    return response
  },
  error => Promise.reject(error)
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}
