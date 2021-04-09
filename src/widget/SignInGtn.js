
import App from './App.svelte';

export class SignInGTN {
    constructor(widgetConfig, successCallback, errorCallback) {
        this.config = widgetConfig
        this.successCallback = successCallback
        this.errorCallback = errorCallback
    }

    renderEl(elementId, success, error) {
        const app = new App({
            target:  document.getElementById(elementId),
            props: {
                config: this.config
            },
            callbacks: {
                onSuccess: this.successCallback,
                onError: this.errorCallback
            },
            onSuccess: this.successCallback
        });
        console.log(app)
    }

    getToken() {

    }

    getUserInfo() {

    }

    logout() {

    }
}