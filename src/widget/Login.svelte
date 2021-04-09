<script>
	import { onMount } from 'svelte';
	import {lang} from "../utils/locale"
	import matcher from "../utils/loginMatcher"
	import api from "../api/kyc"
    import { createEventDispatcher } from 'svelte';

    export let config;

    const dispatch = createEventDispatcher();
	
	let loginType
    let locale = lang[config.appearance.lang]
	let codeSent = false
	let login = ""
	let password = ""
	let remember = false
	let error = false
    let resent_time_avaliable = 60

    function onRegisterClick() {
		dispatch('switchComponent', 'register');
	}

	onMount(async () => {
		if(await api.userinfo()) {
			console.log("redirect")
			//window.location.href = config.redirectUri
		}
	});

	function handleLoginChange(e) {
		loginType = matcher.matchLoginType(e.target.value)
	}

	async function onFormSubmit() {
		let payload = {
			login,
			password,
			client_uid: config.client_uid,
			remember
		}

		error = await api.auth(payload)
        if (!error) {
            if (await api.userinfo()) {
                console.log("redirect")
                // window.location.href = config.redirectUri
            }
        }
	}

	async function OnGetCodeClick() {
		error = await api.sendCode({number: login})
        console.log(error)
        if (!error) {
            codeSent = true
            let interval = setInterval(() => {
                --resent_time_avaliable;
                if (resent_time_avaliable <0) {
                    clearInterval(interval)
                }
            }, 1000)
        }
	}

    function onRestorePasswordClick() {
        dispatch('switchComponent', 'recovery');
    }
</script>

<div class="gtn-signin-form-wrapper">
    <form class="gtn-signin-form"
        on:submit|preventDefault={onFormSubmit}
    >
        <div class="sign-in-text"><h3>{config.appearance.signInFormText}</h3></div>
        <hr/>
        {#if error}
            <div class="alert alert-danger widget-alert">
                {locale[error]} 
            </div>
        {/if}

        <input 
            name="username" 
            id="username" 
            placeholder={locale.login} 
            bind:value={login}
            class="form-control widget-input"
            on:input={handleLoginChange}
        />
        {#if loginType == "email"}
            <br/>
            <input 
                name="password" 
                id="password" 
                placeholder={locale.password} 
                type="password" 
                class="form-control widget-input"
                bind:value={password}
            />
            <br/>
            {#if config.features.rememberMe}
                <div class="form-check remember-block">
                    <input class="form-check-input" type="checkbox" id="flexCheckDefault" name="rememberMe" bind:value={remember}>
                    <label class="form-check-label" for="flexCheckDefault">
                        {locale.remember}
                    </label>
                </div>
            {/if}
            <div class="link" on:click={onRestorePasswordClick}>
                <p class="text-start code_sent">{locale.reset_password}</p>
            </div>
            <br/>
            <input id="submitBtn" type="submit" class="form-control btn-primary widget-btn" value="{locale.sign_in}"/>
        {/if}
        {#if loginType == "sms" & codeSent}
            <br/>
            <input 
                name="verification_code" 
                id="verification_code" 
                placeholder={locale.verification_code}
                class="form-control widget-input"
                bind:value={password}
            />
            <br/>
            {#if resent_time_avaliable >=0}
                <div>
                    <p class="text-start code_sent">{locale.resent_code} {locale.after} {resent_time_avaliable}</p>
                </div>
            {:else}
                <div>
                    <input
                        id="submitBtn" 
                        type="button" 
                        class="form-control btn-primary widget-btn" 
                        value="{locale.resent_code}"
                        on:click={OnGetCodeClick}		
                    />
                </div>
            {/if}
            {#if config.features.rememberMe}
                <div class="form-check">
                    <input class="form-check-input widget-input" type="checkbox" id="flexCheckDefault" name="rememberMe" bind:value={remember}>
                    <label class="form-check-label" for="flexCheckDefault">
                        {locale.remember}
                    </label>
                </div>
            {/if}
            <br/>
            <input id="submitBtn" type="submit" class="form-control btn-primary widget-btn" value="{locale.sign_in}"/>
        {/if}
        {#if loginType == "sms" & !codeSent}
            <br/>
            <input 
                id="submitBtn" 
                type="button" 
                class="form-control btn-primary widget-btn" 
                value="{locale.get_code}"
                on:click={OnGetCodeClick}		
            />
        {/if}
        {#if config.features.registration}
            <hr/>
            <div
                on:click={onRegisterClick} 
                class="link"
            >
                {locale.sign_up}
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
    .gtn-signin-form {
        padding: 40px;
        animation: 0.7s linear 0s 1 appear;
    }

    .sign-in-text {
        text-align: center;
    }
    .remember-block {
        width: 60%;
        float: left;
    }

</style>