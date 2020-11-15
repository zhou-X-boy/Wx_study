// import config from '@/config'
export default function showSucess (text) {
  wx.showToast({
	  title: text,
	  icon: 'success',
	  duration: 2000
  })
}
export function showModel (title, content) {
  wx.showModal({
	  title: title,
	  content: content,
	  showCancel: false
  })
}

function request (url, method, data) {
  return new Promise(
    (resolve, reject) => {
      wx.request({
	           url: 'http://localhost:5757' + url,
	           method: method,
	           data: data,
	           success: function (res) {
	             console.log('请求成功，在前端打印的信息', res)
	          	 if (res.data.code === 0) {
	          	 	// 将pending状态变成resolve状态
	          	 	resolve(res.data.data)
	          	 } else {
	          	 	// 将pending状态变成reject状态
	          	 	reject(res.data)
	          	 }
	           }
	        })
    }
  )
}

export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}
