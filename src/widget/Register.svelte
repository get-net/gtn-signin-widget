<script>
    import { onMount } from 'svelte';
    import {lang} from "../utils/locale"
    import api from "../api/kyc"
    import matcher from "../utils/loginMatcher"
    import { createEventDispatcher } from 'svelte';

    export let config;

    const dispatch = createEventDispatcher();

    let locale = lang[config.appearance.lang]
    let username = ""
    let login = ""
    let password = ""
    let countries = []
    let confirm_password = ""
    let role = "ru"
    let verification_code = ""
    let error = false
    let success = false
    let loginType

    onMount(async () => {
		countries = await api.getCountryRoles()
	});

    function handleLoginChange(e) {
		loginType = matcher.matchLoginType(e.target.value)
	}

    async function onFormSubmit(e) {
		if (password !== confirm_password) {
            error = "passwords not match"
        }

        let role_uid = findRole(countries)

        let payload = {
            login,
            password,
            name: username,
            locale: config.appearance.lang,
            role: role_uid,
            client_uid: config.client_uid
        }
        error = await api.register(payload)
        if (!error) {
            success = true
        }
	}

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

    function onLoginClick() {
        dispatch('switchComponent', 'login');
    }

    function findRole(countries) {
        let roles = countries.find(c => {
            return c.code === role
        }).roles
        let role_uid = roles.find(role_item => role_item.name === 'per').uid;
        return role_uid;
    }
</script>

<div class="gtn-register-form-wrapper">
    
    {#if loginType === "sms" & success}
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
    {:else}
        <form class="gtn-register-form"
            on:submit|preventDefault={onFormSubmit}
        >
        <div class="sign-in-text"><h3>{config.appearance.signUpFormText}</h3></div>
        <hr/>
        {#if error}
            <div class="alert alert-danger widget-alert">
                {error}
            </div>
        {/if}
        {#if success & loginType === "email"}
            <div class="alert alert-success widget-alert">
                {locale.reg_success}<br/>
                {locale.email_sent} {login}
                <span on:click={onLoginClick}>Вход</span>
            </div>
        {/if}
        <input 
            name="username" 
            id="username" 
            placeholder={locale.username} 
            bind:value={username}
            class="form-control widget-input"
        />
        <br/>
        <input 
            name="login" 
            id="login" 
            placeholder={locale.login} 
            bind:value={login}
            class="form-control widget-input"
            on:input={handleLoginChange}
        />
        {#if loginType === "email"}
            <br/>
            <input 
                name="password" 
                id="password" 
                type="password"
                placeholder={locale.password} 
                bind:value={password}
                class="form-control widget-input"
            />
            <br/>
            <input 
                name="confirm_password" 
                id="confirm_password" 
                type="password"
                placeholder={locale.confirm_password} 
                bind:value={confirm_password}
                class="form-control widget-input"
            />
        {/if}
        <br/>
        <select class="form-control widget-select" aria-label="Default select example" bind:value={role}>
            {#each countries as country}
                <option value={country.code}>{country.name}</option>
            {/each}
            
        </select>
        <br/>
        <input id="submitBtn" type="submit" class="form-control btn-primary widget-btn" value="{locale.sign_up}"/>
        <br/>
        <a on:click={onLoginClick} class="link">
            {locale.get_back}
        </a>
        </form>
    {/if}
    

</div>

<style>
    @keyframes slideInFromLeftRegister {
        0% {
            opacity: 0;
            transform: translateX(-20%);
        }
        100% {
            opacity: 100;
            transform: translateX(0);
        }
    }
    .gtn-register-form {
        padding: 40px;
        animation: 0.7s ease-out 0s 1 slideInFromLeftRegister;
    }
    .code_sent {
        color: #888787;
        font-size: 15px;
    }
    .sign-in-text {
        text-align: center;
    }
</style>