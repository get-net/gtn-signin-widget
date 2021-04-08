<script>
	import { createEventDispatcher } from 'svelte';
	import Register from "./Register.svelte"
	import Login from './Login.svelte';
import Recovery from './Recovery.svelte';
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
</style>