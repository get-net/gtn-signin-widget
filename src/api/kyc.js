import kyc from "./kyc_service"
import storageManager from "../utils/storageManager"
export default {

    async auth(payload) {
        return kyc.post("papi/v1/agent/authorize/", payload).then(({data}) => {
            console.log(data)
            if (data.success) {
                storageManager.setToken(data.result.access_token)
            } else {
                return data.error
            }
        }).catch(e => {
            console.log(e)
        })
    },

    async userinfo() {
        let headers = {"Authorization": `Bearer ${storageManager.getToken()}`};
        return kyc.get("oauth/userinfo", {headers: headers}).then(({data}) => {
            storageManager.setUserInfo(data)
            return true
        }).catch(er => {
            console.log(er)
            return false
        })
    },

    async register(body) {
        return kyc.post("papi/v1/agent/register", body).then(({data}) => {
            if (!data.success) {
                return data.error
            }
        }).catch(er => {
            console.log(er)
            return false
        })
    },

    getCountryRoles() {
        return kyc.get('profile/country/list').then(({data}) => {
            console.log(data)
            return data
        }).catch(er => {
            console.log(er)
            return false
        })
    },

    async sendCode(payload) {
        return kyc.post("/profile/agent/send_code", payload)
            .then(({data}) => {
                return true
            })
            .catch(e => {
                console.log(e)
                return false
            })
    }
}