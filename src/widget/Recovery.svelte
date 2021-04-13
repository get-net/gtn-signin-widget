<script>
    import { lang } from "../utils/locale";
    import api from "../api/kyc";
    import { createEventDispatcher } from "svelte";

    export let config;

    let locale = lang[config.lang];
    let email = "";
    let error = "";
    let success = false;

    const dispatch = createEventDispatcher();

    async function onFormSubmit() {
        let [resp_success, error_code] = await api.recover({
            email,
            locale: config.lang,
        });
        success = resp_success;
        error = error_code;
    }

    function onLoginClick() {
        dispatch("switchComponent", "login");
    }
</script>

<div class="gtn-signin-form-wrapper">
    <form class="gtn-recovery-form" on:submit|preventDefault={onFormSubmit}>
        <hr />
        {#if error}
            <div class="alert-danger widget-alert">
                {locale[error]}
            </div>
        {/if}
        {#if success}
            <div class="alert-success widget-alert">
                {locale.revovery_sent}
                {email}
            </div>
        {/if}
        <input
            name="email"
            id="email"
            type="email"
            placeholder={locale.email}
            bind:value={email}
            class="widget-input"
        />
        <br />
        {#if !success}
            <input
                id="submitBtn"
                type="submit"
                class="widget-input widget-btn"
                value={locale.reset_with_email}
            />
        {/if}
        <hr />
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
</style>
