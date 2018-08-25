import {
	post
} from '../axiosconfig/'
export default {
	login(params) {
		return post('/users/api/login', params)
	}
}