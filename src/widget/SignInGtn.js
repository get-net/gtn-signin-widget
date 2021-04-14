
import App from './App.svelte';
import storageManager from '../utils/storageManager';
import kyc from '../api/kyc'

const defaultConfig = {
    client_uid: null,
    appearance: {
        logo: {
            src: "https://www.get-net.ru/img/logo.png",
            width: "400px"
        },
		signInFormText: "Get-Net Sign in",
		signUpFormText: "Get-Net Sign Up",
		width: "500px"
    },
    lang: "en",
    features: {
        registration: true,
        rememberMe : true
    }
}

const defaultSuccess = function() {

}

const defaultError = function() {

}

export class SignInGTN {

    constructor(widgetConfig = defaultConfig, successCallback = defaultSuccess, errorCallback = defaultError) {
        this.config = widgetConfig
        this.successCallback = successCallback
        this.errorCallback = errorCallback
        window.$gtn_widget = this;
    }

    renderEl(elementId) {
        const app = new App({
            target:  document.getElementById(elementId),
            props: {
                config: this.config,
            },
        });
    }

    getToken() {
        return storageManager.getToken();
    }

    getUserInfo() {
        return storageManager.getUserInfo();
    }

    logout() {
        storageManager.removeToken();
        storageManager.removeUserInfo()
    }

    async checkTokenValid() {
        return await kyc.userinfo(false)
    }
}