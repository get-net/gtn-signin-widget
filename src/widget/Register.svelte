<script>
    import { onMount } from "svelte";
    import { lang } from "../utils/locale";
    import api from "../api/kyc";
    import matcher from "../utils/loginMatcher";
    import { createEventDispatcher } from "svelte";
    import RegisterSms from "./RegisterSms.svelte";

    export let config;

    const dispatch = createEventDispatcher();

    let locale = lang[config.lang];
    let username = "";
    let login = "";
    let password = "";
    let countries = [];
    let confirm_password = "";
    let role = "ru";
    let error = false;
    let success = false;
    let loginType;

    onMount(async () => {
        countries = await api.getCountryRoles();
    });

    function handleLoginChange(e) {
        loginType = matcher.matchLoginType(e.target.value);
    }

    async function onFormSubmit(e) {
        if (password !== confirm_password && loginType === "email") {
            error = "passwords_not_match";
            return;
        }

        let role_uid = findRole(countries);

        let payload = {
            login,
            password,
            name: username,
            locale: config.lang,
            role: role_uid,
            client_uid: config.client_uid
        };

        let [resp_success, error_code] = await api.register(payload);
        success = resp_success;
        error = error_code;
    }

    function onLoginClick() {
        dispatch("switchComponent", "login");
    }

    function findRole(countries) {
        let roles = countries.find((c) => {
            return c.code === role;
        }).roles;
        let role_uid = roles.find((role_item) => role_item.name === "per").uid;
        return role_uid;
    }
</script>

<div class="gtn-register-form-wrapper">
    {#if (loginType === "sms") & success}
        <RegisterSms {config} {login} />
    {:else}
        <form class="gtn-register-form" on:submit|preventDefault={onFormSubmit}>
            <div class="sign-in-text">
                <h3>{config.appearance.signUpFormText}</h3>
            </div>
            <hr />
            {#if error}
                <div class="alert-danger widget-alert">
                    {locale[error]}
                </div>
            {/if}
            {#if success & (loginType === "email")}
                <div class="alert-success widget-alert">
                    {locale.reg_success}<br />
                    {locale.email_sent}
                    {login}
                </div>
                <hr />
                <div on:click={onLoginClick} class="link">
                    {locale.enter}
                </div>
            {:else}
                <input
                    name="username"
                    id="username"
                    placeholder={locale.username}
                    bind:value={username}
                    class="widget-input"
                />
                <br />
                <input
                    name="login"
                    id="login"
                    placeholder={locale.login}
                    bind:value={login}
                    class="widget-input"
                    on:input={handleLoginChange}
                />
                {#if loginType === "email"}
                    <br />
                    <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder={locale.password}
                        bind:value={password}
                        class="widget-input"
                    />
                    <br />
                    <input
                        name="confirm_password"
                        id="confirm_password"
                        type="password"
                        placeholder={locale.confirm_password}
                        bind:value={confirm_password}
                        class="widget-input"
                    />
                {/if}
                <br />
                <select
                    class="widget-input widget-select"
                    aria-label="Default select example"
                    bind:value={role}
                >
                    {#each countries as country}
                        <option value={country.code}>{country.name}</option>
                    {/each}
                </select>
                <br />
                <input
                    id="submitBtn"
                    type="submit"
                    class="widget-input widget-btn"
                    value={locale.sign_up}
                />
                <hr />
                <div on:click={onLoginClick} class="link">
                    {locale.get_back}
                </div>
            {/if}
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
    .sign-in-text {
        text-align: center;
    }
</style>
