import kyc from "./kyc_service"
import storageManager from "../utils/storageManager"
export default {

    async auth(payload) {
        return kyc.post(`papi/v1/agent/authorize?client_uid=${payload.client_uid}`, payload)
            .then(({data}) => {
                if (data.success) {
                    storageManager.setToken(data.result.access_token)
                    return [true, null]
                }

                return [false, data.error_code]
            }).catch(er => {
                window.$gtn_widget.errorCallback(er)
                return [false, er]
            })
    },

    async userinfo() {
        let headers = {"Authorization": `Bearer ${storageManager.getToken()}`};
        return kyc.get("oauth/userinfo", {headers: headers})
            .then(({data}) => {
                storageManager.setUserInfo(data)
                return true
            }).catch(er => {
                window.$gtn_widget.errorCallback(er)
                return false
            })
    },

    async register(payload) {
        return kyc.post(`papi/v1/agent/register?client_uid=${payload.client_uid}`, payload)
            .then(({data}) => {
                if (data.success) {
                    return [true, null]
                }
                return [false, data.error_code]
            }).catch(er => {
                window.$gtn_widget.errorCallback(er)
                return [false, er]
            })
    },

    getCountryRoles() {
        return kyc.get('profile/country/list')
            .then(({data}) => {
                return data
            }).catch(er => {
                window.$gtn_widget.errorCallback(er)
                return false
            })
    },

    async sendCode(payload) {
        return kyc.post("/profile/agent/send_code", payload)
            .then(({data}) => {
                if (data.success) {
                    return [true, null]
                }
                return [false, data.error_code]
            })
            .catch(er => {
                window.$gtn_widget.errorCallback(er)
                return [false, er]
            })
    },

    async recover(payload) {
        return kyc.post("/profile/agent/recovery", payload)
            .then(({data}) => {
                if (data.success) {
                    return [true, null]
                }
                return [false, data.error_code]
            })
            .catch(er => {
                window.$gtn_widget.errorCallback(er)
                return [false, er]
            })
    }
}