import http from './http.js'
class Api {
	getArticle(parms) {
		return http.get(`/getWeiDate`,parms)
	}
	
	getEmoJson() {
		return http.get(`/emoticon.json`)
	}
}
export default new Api()
