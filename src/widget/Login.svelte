<script>
    import { onMount } from "svelte";
    import { lang } from "../utils/locale";
    import matcher from "../utils/loginMatcher";
    import api from "../api/kyc";
    import { createEventDispatcher } from "svelte";

    export let config;

    const dispatch = createEventDispatcher();

    let loginType;
    let locale = lang[config.lang];
    let codeSent = false;
    let login = "";
    let password = "";
    let remember = false;
    let error = "";
    let resent_time_avaliable = 60;

    function onRegisterClick() {
        dispatch("switchComponent", "register");
    }

    onMount(async () => {
        await checkUserInfo();
    });

    function handleLoginChange(e) {
        loginType = matcher.matchLoginType(e.target.value);
    }

    async function onFormSubmit() {
        let payload = {
            login,
            password,
            remember,
            locale: config.lang,
        };

        let [resp_success, error_code] = await api.auth(
            payload,
            config.client_uid
        );
        error = error_code;

        if (resp_success) {
            await checkUserInfo();
        }
    }

    async function OnGetCodeClick() {
        let [resp_success, error_code] = await api.sendCode(
            { number: login, locale: config.lang },
            config.client_uid
        );
        error = error_code;
        if (resp_success) {
            codeSent = true;
            let interval = setInterval(() => {
                --resent_time_avaliable;
                if (resent_time_avaliable < 0) {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

    async function checkUserInfo() {
        if (await api.userinfo()) {
            window.$gtn_widget.successCallback();
        }
    }

    function onRestorePasswordClick() {
        dispatch("switchComponent", "recovery");
    }
</script>

<div class="gtn-signin-form-wrapper">
    <form class="gtn-signin-form" on:submit|preventDefault={onFormSubmit}>
        <div class="sign-in-text">
            <h3>{config.appearance.signInFormText}</h3>
        </div>
        <hr />
        {#if error}
            <div class="alert-danger widget-alert">
                {locale[error]}
            </div>
        {/if}

        <input
            name="username"
            id="username"
            placeholder={locale.login}
            bind:value={login}
            class="widget-input"
            on:input={handleLoginChange}
        />
        {#if loginType == "email"}
            <br />
            <input
                name="password"
                id="password"
                placeholder={locale.password}
                type="password"
                class="widget-input"
                bind:value={password}
            />
            <br />
            {#if config.features.rememberMe}
                <div class="remember-block">
                    <input
                        class="widget-input-check"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="rememberMe"
                        bind:value={remember}
                    />
                    <label class="" for="flexCheckDefault">
                        {locale.remember}
                    </label>
                </div>
            {/if}
            <div class="link" on:click={onRestorePasswordClick}>
                <p class="code_sent">{locale.reset_password}</p>
            </div>
            <br />
            <input
                id="submitBtn"
                type="submit"
                class="widget-input widget-btn"
                value={locale.sign_in}
            />
        {/if}
        {#if (loginType == "sms") & codeSent}
            <br />
            <input
                name="verification_code"
                id="verification_code"
                placeholder={locale.verification_code}
                class="form-control widget-input"
                bind:value={password}
            />
            <br />
            {#if resent_time_avaliable >= 0}
                <div>
                    <p class="code_sent">
                        {locale.resent_code}
                        {locale.after}
                        {resent_time_avaliable}
                    </p>
                </div>
            {:else}
                <div>
                    <input
                        id="submitBtn"
                        type="button"
                        class="widget-input widget-btn"
                        value={locale.resent_code}
                        on:click={OnGetCodeClick}
                    />
                </div>
            {/if}
            {#if config.features.rememberMe}
                <div class="remember-block">
                    <input
                        class="widget-input-check"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="rememberMe"
                        bind:value={remember}
                    />
                    <label for="flexCheckDefault">
                        {locale.remember}
                    </label>
                </div>
            {/if}
            <br />
            <input
                id="submitBtn"
                type="submit"
                class="widget-input widget-btn"
                value={locale.sign_in}
            />
        {/if}
        {#if (loginType == "sms") & !codeSent}
            <br />
            <input
                id="submitBtn"
                type="button"
                class="widget-input widget-btn"
                value={locale.get_code}
                on:click={OnGetCodeClick}
            />
        {/if}
        {#if config.features.registration}
            <hr />
            <div on:click={onRegisterClick} class="link">
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
        margin-bottom: 1rem;
    }
</style>
