<script>
	import { onMount } from 'svelte';
	import {lang} from "../utils/locale"
	import matcher from "../utils/loginMatcher"
	import api from "../api/kyc"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
	function onRegisterClick() {
		dispatch('registerClick');
	}
	export let config;
	let loginType
	let codeSent = false
	let login = ""
	let password = ""
	let remember = false
	let error = false
	onMount(async () => {
		if(await api.userinfo()) {
			console.log("redirect")
			//window.location.href = config.redirectUri
		}
	});

	function handleLoginChange(e) {
		loginType = matcher.matchLoginType(e.target.value)
	}

	async function onFormSubmit(e) {
		let payload = {
			login: login,
			password: password,
			client_uid: config.client_uid,
			remember: remember
		}
		error = await api.auth(payload)
		await api.userinfo()
		console.log("redirect")
		// window.location.href = config.redirectUri
	}

	async function OnGetCodeClick(e) {
		codeSent = await api.sendCode({number: login})
	}

</script>
<div id="gtn-signin-form-wrapper">
    <form id="gtn-signin-form"
        on:submit|preventDefault={onFormSubmit}
    >
    <div id="widget-logo">
        <img src={config.appearance.logo.src} alt="" width={config.appearance.logo.width}>
    </div>
    <hr/>
    {#if error}
        <div class="alert alert-danger">
            {error}
        </div>
    {/if}

    <input 
        name="username" 
        id="username" 
        placeholder={lang[config.appearance.lang].login} 
        bind:value={login}
        class="form-control"
        on:input={handleLoginChange}
    />
    {#if loginType == "email"}
        <br/>
        <input 
            name="password" 
            id="password" 
            placeholder={lang[config.appearance.lang].password} 
            type="password" 
            class="form-control"
            bind:value={password}
        />
        <br/>
        {#if config.features.rememberMe}
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" name="rememberMe" bind:value={remember}>
                <label class="form-check-label" for="flexCheckDefault">
                    {lang[config.appearance.lang].remember}
                </label>
            </div>
        {/if}
        <br/>
        <input id="submitBtn" type="submit" class="form-control btn-outline-secondary" value="{lang[config.appearance.lang].sign_in}"/>
    {/if}
    {#if loginType == "sms" & codeSent}
        <br/>
        <input 
            name="verification_code" 
            id="verification_code" 
            placeholder={lang[config.appearance.lang].verification_code}
            class="form-control"
            bind:value={password}
        />
        <br/>
        {#if config.features.rememberMe}
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" name="rememberMe" bind:value={remember}>
                <label class="form-check-label" for="flexCheckDefault">
                    {lang[config.appearance.lang].remember}
                </label>
            </div>
        {/if}
        <br/>
        <input id="submitBtn" type="submit" class="form-control btn-outline-secondary" value="{lang[config.appearance.lang].sign_in}"/>
    {/if}
    {#if loginType == "sms" & !codeSent}
        <br/>
        <input 
            id="submitBtn" 
            type="button" 
            class="form-control btn-outline-secondary" 
            value="{lang[config.appearance.lang].get_code}"
            on:click={OnGetCodeClick}		
        />
    {/if}
    {#if config.features.registration}
        <hr/>
        <div 
            id="register-widget"
            on:click={onRegisterClick}
        >
            {lang[config.appearance.lang].no_account} {lang[config.appearance.lang].sign_up}
        </div>
    {/if}
    </form>
</div>
<style>
    @keyframes appear {
    0% {
        opacity: 0;
    }
    100% {
      opacity: 100;
    }
}
#gtn-signin-form {
    padding: 40px;
    animation: 0.7s linear 0s 1 appear;
}

#widget-logo {
    text-align: center;
}
</style>