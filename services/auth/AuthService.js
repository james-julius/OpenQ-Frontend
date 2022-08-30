import axios from 'axios';

class AuthService {
	
	constructor() { }

	async hasSignature(account) {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/hasSignature?address=${account}`, { withCredentials: true });
				resolve(response);
			} catch(error) {
				reject(error);
			}
		});
	}

}

export default AuthService;