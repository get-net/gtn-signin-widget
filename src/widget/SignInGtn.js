
import App from './App.svelte';

export class SignInGTN {
    constructor(widgetConfig) {
        this.config = widgetConfig
    }

    renderEl(elementId, success, error) {
        const app = new App({
            target:  document.getElementById(elementId),
            props: {
                config: this.config
            }
        });
    }
}