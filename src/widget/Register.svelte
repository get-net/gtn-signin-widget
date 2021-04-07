<script>
    import { onMount } from 'svelte';
    import {lang} from "../utils/locale"
    import api from "../api/kyc"
    import matcher from "../utils/loginMatcher"
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let username = ""
    let login = ""
    let password = ""
    let countries = []
    let confirm_password = ""
    let role = "ru"
    export let config;
    let error = false
    let success = true
    let loginType
    let codeSent = false

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
        let role_uid = countries.find(c => {
            return c.code === role
        }).uid_role
        let payload = {
            login: login,
            password: password,
            name: username,
            locale: config.appearance.lang,
            role: role_uid,
        }
        error = await api.register(payload)
	}

    async function OnGetCodeClick(e) {
		codeSent = await api.sendCode({number: login})
	}

    function onLoginClick() {
        dispatch('loginClick');
    }
</script>

<div id="gtn-register-form-wrapper">
    <form id="gtn-register-form"
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
    {#if success}
        <div class="alert alert-success">
            {lang[config.appearance.lang].reg_success}<br/>
            <span on:click={onLoginClick}>Вход</span>
        </div>
    {/if}
    <input 
        name="username" 
        id="username" 
        placeholder={lang[config.appearance.lang].username} 
        bind:value={username}
        class="form-control"
    />
    <br/>
    <input 
        name="login" 
        id="login" 
        placeholder={lang[config.appearance.lang].login} 
        bind:value={login}
        class="form-control"
        on:input={handleLoginChange}
    />
    {#if loginType === "email"}
        <br/>
        <input 
            name="password" 
            id="password" 
            type="password"
            placeholder={lang[config.appearance.lang].password} 
            bind:value={password}
            class="form-control"
        />
        <br/>
        <input 
            name="confirm_password" 
            id="confirm_password" 
            type="password"
            placeholder={lang[config.appearance.lang].confirm_password} 
            bind:value={confirm_password}
            class="form-control"
        />
    {/if}
    <br/>
    <select class="form-control" aria-label="Default select example" bind:value={role}>
        {#each countries as country}
            <option value={country.code}>{country.name}</option>
        {/each}
        
    </select>
    <br/>
    <input id="submitBtn" type="submit" class="form-control btn-outline-secondary" value="{lang[config.appearance.lang].sign_up}"/>
    <br/>
    <div on:click={onLoginClick}>
        Назадло
    </div>
    </form>

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
#gtn-register-form {
    padding: 40px;
    animation: 0.7s ease-out 0s 1 slideInFromLeftRegister;
}
#widget-logo {
    text-align: center;
}
</style>