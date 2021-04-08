import kyc from "./kyc_service"
import storageManager from "../utils/storageManager"
export default {

    async auth(payload) {
        return kyc.post("papi/v1/agent/authorize/", payload)
            .then(({data}) => {
                if (data.success) {
                    storageManager.setToken(data.result.access_token)
                    return false
                }

                return data.error_code
            }).catch(e => {
                console.log(e)
                return e
            })
    },

    async userinfo() {
        let headers = {"Authorization": `Bearer ${storageManager.getToken()}`};
        return kyc.get("oauth/userinfo", {headers: headers})
            .then(({data}) => {
                storageManager.setUserInfo(data)
                return true
            }).catch(er => {
                console.log(er)
                return false
            })
    },

    async register(body) {
        return kyc.post("papi/v1/agent/register", body)
            .then(({data}) => {
                if (data.success) {
                    return false
                }
                return data.error_code
            }).catch(er => {
                console.log(er)
                return true
            })
    },

    getCountryRoles() {
        return kyc.get('profile/country/list')
            .then(({data}) => {
                return data
            }).catch(er => {
                console.log(er)
                return false
            })
    },

    async sendCode(payload) {
        return kyc.post("/profile/agent/send_code", payload)
            .then(({data}) => {
                if (data.success) {
                    return false
                }
                return data.error_code
            })
            .catch(e => {
                console.log(e)
                return e
            })
    },

    async recover(payload) {
        return kyc.post("/profile/agent/recovery", payload)
            .then(({data}) => {
                if (data.success) {
                    return false
                }
                return data.error_code
            })
            .catch(e => {
                return e
            })
    }
}