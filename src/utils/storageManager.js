export default {
    getToken() {
        return window.localStorage.getItem('gtn_access_token')
    },

    setToken(value) {
        window.localStorage.setItem('gtn_access_token', value)
    },
    removeToken() {
        window.localStorage.removeItem("gtn_acces_token")
    },
    setUserInfo(value) {
        let stringified_value = JSON.stringify(value)
        window.localStorage.setItem('gtn_user_info', stringified_value)
    },

    getUserInfo() {
        let stringified_value = window.localStorage.getItem('gtn_user_info')
        return JSON.parse(stringified_value)
    },
    removeUserInfo() {
        window.localStorage.removeItem("gtn_user_info")
    }

}