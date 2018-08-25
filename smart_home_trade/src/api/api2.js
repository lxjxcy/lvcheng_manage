import {
	post
} from '../axiosconfig/'
export default {
	regist(params) {
		return post('/users/api/regist', params)
	}
}