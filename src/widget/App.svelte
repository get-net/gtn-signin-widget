<script>
	import { createEventDispatcher } from 'svelte';
	import Register from "./Register.svelte"
	import Login from './Login.svelte';
	export let config;
	let register = false

	const dispatch = createEventDispatcher();
	function onRegisterClick() {
		register = true
	}
	function onLoginClick() {
		register = false
	}
</script>

<div id="gtn-widget-wrapper" style={'width:'+ config.appearance.width}>
	{#if register}
		<Register config={config} on:loginClick = {onLoginClick}>
		</Register>
	{:else}	
		<Login config={config} on:registerClick = {onRegisterClick}>
		</Login>
	{/if}
</div>

<style>
	@import "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
	#gtn-widget-wrapper {
    	margin: auto;
	}
</style>