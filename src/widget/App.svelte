<script>
    import Register from "./Register.svelte";
    import Login from "./Login.svelte";
    import Recovery from "./Recovery.svelte";
    export let config;
    let component = "login";

    function onSwithComponentClick(value) {
        component = value.detail;
    }
</script>

<div class="gtn-widget-wrapper" style={"width:" + config.appearance.width}>
    <div class="widget-logo">
        <img
            src={config.appearance.logo.src}
            alt=""
            width={config.appearance.logo.width}
        />
    </div>
    {#if component === "register"}
        <Register {config} on:switchComponent={onSwithComponentClick} />
    {/if}

    {#if component === "login"}
        <Login {config} on:switchComponent={onSwithComponentClick} />
    {/if}

    {#if component === "recovery"}
        <Recovery {config} on:switchComponent={onSwithComponentClick} />
    {/if}
</div>

<style>
    .gtn-widget-wrapper {
        margin: auto;
    }
    .widget-logo {
        text-align: center;
        margin-bottom: -25px;
    }
    .gtn-widget-wrapper :global(.link) {
        color: #52a329;
        cursor: pointer;
        text-decoration: none;
    }
    .gtn-widget-wrapper :global(.widget-input) {
        min-height: 47px;
        color: black;
        font-size: 18px;
        line-height: 22px;
        padding: 0 1.3rem;
        display: block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
	.gtn-widget-wrapper :global(.widget-select) {
		-webkit-appearance: none;
		-moz-appearance: none;
		background: transparent;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: 100%;
		background-position-y: 10px;
		border: 1px solid #dfdfdf;
		border-radius: 2px;
		margin-right: 2rem;
		padding-right: 2rem;
	}
    .gtn-widget-wrapper :global(.widget-input:focus) {
        background-color: #fff;
        border-color: #8ceabb;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(38 208 124 / 25%);
    }
    .gtn-widget-wrapper :global(.widget-btn) {
        color: #fff;
        background-color: #26d07c;
        border-color: #26d07c;
        min-height: 47px;
        font-family: "Roboto", sans-serif;
        font-style: normal;
        font-weight: 900;
        font-size: 14px;
        line-height: 16px;
    }
    .gtn-widget-wrapper :global(.widget-btn:focus) {
        color: #4a4a4b;
    }
    .gtn-widget-wrapper :global(.sign-in-text) {
        color: #26d07c;
    }
    .gtn-widget-wrapper :global(.widget-input-check) {
        margin-top: 0.3rem;
        margin-left: -1.25rem;
        border: 1px solid #ccc;
        border-radius: 2px;
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
    .gtn-widget-wrapper :global(.widget-alert) {
        position: relative;
        padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid transparent;
        border-radius: 0.25rem;
    }
    .gtn-widget-wrapper :global(.alert-danger) {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
    .gtn-widget-wrapper :global(.alert-success) {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
    }
    .gtn-widget-wrapper :global(hr) {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }
    .gtn-widget-wrapper :global(h3) {
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
        margin-top: 0;
    }
    .gtn-widget-wrapper :global(label) {
        display: inline-block;
    }
    .gtn-widget-wrapper :global(p) {
        margin-top: 0;
    }
</style>
