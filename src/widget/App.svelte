<script>
	import { createEventDispatcher } from 'svelte';
	import Register from "./Register.svelte"
	import Login from './Login.svelte';
	import Recovery from './Recovery.svelte';
	import Verified from './Verified.svelte';
	export let config;

	let component = "login"
	const dispatch = createEventDispatcher();

	function onSwithComponentClick(value) {
		component = value.detail
	}

</script>

<div class="gtn-widget-wrapper" style={'width:'+ config.appearance.width}>
	<div class="widget-logo">
        <img src={config.appearance.logo.src} alt="" width={config.appearance.logo.width}>
    </div>
	<Verified></Verified>
	{#if component === "register"}
		<Register config={config} on:switchComponent = {onSwithComponentClick}>
		</Register>
	{/if}	

	{#if component === "login"}
		<Login config={config} on:switchComponent = {onSwithComponentClick}>
		</Login>
	{/if}

	{#if component === "recovery"}
		<Recovery config={config} on:switchComponent = {onSwithComponentClick}>
		</Recovery>
	{/if}
</div>

<style>
	@import "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
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
		vertical-align: middle;
	}
	.gtn-widget-wrapper :global(.widget-input:focus) {
		background-color: #fff;
		border-color: #8ceabb;
		outline: 0;
		box-shadow: 0 0 0 0.2rem rgb(38 208 124 / 25%);
	}
	.gtn-widget-wrapper :global(.btn-primary) {
		color: #fff;
		background-color: #26D07C;
		border-color: #26D07C;
		min-height: 47px;
		font-family: "Roboto", sans-serif;
		font-style: normal;
		font-weight: 900;
		font-size: 14px;
		line-height: 16px;
	}
	.gtn-widget-wrapper :global(.sign-in-text) {
		color: #26D07C
	}
</style>