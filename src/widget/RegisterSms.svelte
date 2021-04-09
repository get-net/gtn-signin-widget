<script>
    import { createEventDispatcher } from 'svelte';

    export let config;
    export let login;

    let verification_code = ""
    let error = false
    const dispatch = createEventDispatcher();
    
    let locale = lang[config.appearance.lang]
    async function onConfirmCodeSubmit() {
        let payload = {
			login,
			password: verification_code,
			client_uid: config.client_uid,
		}

		error = await api.auth(payload)
        if (!error) {
            if (await api.userinfo()) {
                console.log("redirect")
                // window.location.href = config.redirectUri
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
        <div class="alert alert-danger widget-alert">
            {error}
        </div>
    {/if}
    <hr/>
    <input 
        name="verification_code" 
        id="verification_code" 
        placeholder={locale.verification_code} 
        bind:value={verification_code}
        class="form-control widget-input"
    />
    
    <br/>
    <p class="text-start code_sent">{locale.code_sent} {login}</p>
    <input id="submitBtn" type="submit" class="form-control btn-primary widget-btn" value="{locale.sign_in}"/>
</form>