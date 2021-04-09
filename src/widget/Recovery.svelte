<script>
	import {lang} from "../utils/locale"
	import api from "../api/kyc"
    import { createEventDispatcher } from 'svelte';

    export let config;

    let locale = lang[config.appearance.lang]
    let email = "";
    let error = false;
    let success = false;
    const dispatch = createEventDispatcher();

    async function onFormSubmit() {
        let paylaod = {
            email
        }
        error = await api.recover(paylaod)
        if(!error) {
            success = true
        }
    }
    function onLoginClick() {
        dispatch('switchComponent', 'login');
    }
</script>

<div class="gtn-signin-form-wrapper">
    <form class="gtn-recovery-form"
        on:submit|preventDefault={onFormSubmit}
    >
        <hr/>
        {#if error}
            <div class="alert alert-danger widget-alert">
                {locale[error]} 
            </div>
        {/if}
        {#if success}
            <div class="alert alert-success widget-alert">
                {locale.revovery_sent} {email}
            </div>
        {/if}
        <input 
            name="email" 
            id="email"
            type="email"
            placeholder={locale.email} 
            bind:value={email}
            class="form-control widget-input"
        />
        <br/>
        {#if !success}
            <input id="submitBtn" type="submit" class="form-control btn-primary widget-btn" value="{locale.reset_with_email}"/>
        {/if}
        <hr/>
        <div on:click={onLoginClick} class="link">
            {locale.get_back} 
        </div>
    </form>
    
</div>
<style>
    .gtn-recovery-form {
        padding: 40px;
        animation: 0.7s linear 0s 1 appear;
    }
    #get_back_link {
        cursor: pointer;
    }
</style>