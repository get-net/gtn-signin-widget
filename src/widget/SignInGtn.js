
import App from './App.svelte';
import storomageManager from '../utils/storageManager'
import storageManager from '../utils/storageManager';
export class SignInGTN {

    constructor(widgetConfig, successCallback = null, errorCallback = null) {
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
        return storomageManager.getToken();
    }

    getUserInfo() {
        return storomageManager.getUserInfo();
    }

    logout() {
        storageManager.removeToken();
        storageManager.removeUserInfo()
    }
}