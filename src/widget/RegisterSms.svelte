<script>
    export let config;
    export let login;

    let verification_code = ""
    let error = false
    
    let locale = lang[config.lang]

    async function onConfirmCodeSubmit() {
        let payload = {
			login,
			password: verification_code,
			client_uid: config.client_uid,
            locale: config.lang
		}

		let [resp_success, error_code] = await api.auth(payload)
        error = error_code

        if (resp_success) {
            if (await api.userinfo()) {
                window.$gtn_widget.successCallback()
            }
        }
    }
</script>
<form
    class="gtn-register-form"
    on:submit|preventDefault={onConfirmCodeSubmit}
>
    <div class="sign-in-text"><h3>{config.appearance.signUpFormText}</h3></div>
    {#if error}
        <div class="alert-danger widget-alert">
            {locale[error]} 
        </div>
    {/if}
    <hr/>
    <input 
        name="verification_code" 
        id="verification_code" 
        placeholder={locale.verification_code} 
        bind:value={verification_code}
        class="widget-input"
    />
    <br/>
    <p class="code_sent">{locale.code_sent} {login}</p>
    <input id="submitBtn" type="submit" class="widget-input widget-btn" value="{locale.sign_in}"/>
</form>