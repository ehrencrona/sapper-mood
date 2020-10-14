<script lang="ts">
	import { onMount } from "svelte";
	import { login, getAuthToken } from "./_auth";

	let error: Error = null;
	let token: string = null;

	import LoggedInHome from "../components/LoggedInHome.svelte";

	onMount(() => getAuthToken().then((newToken) => (token = newToken)));

	const onError = (e: Error) => {
		error = e;
	};

	const onLoginExpired = () => {
		token = null;
		onError(new Error("Your session has expired. Please log in again."));
	};
</script>

<style lang="scss">
	.container {
		display: flex;
		margin-top: 2em;

		.content {
			margin: 0 auto;

			#login {
				background-color: #328598;
				color: white;
				font-weight: 700;
				border: none;
				border-radius: 2px;

				padding: 1em;
				font-size: 1.2em;
				cursor: pointer;
			}
		}
	}

	.error {
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 0.5em;
		background-color: #f55252;
		color: white;
	}
</style>

<svelte:head>
	<title>Sentiment</title>
</svelte:head>

<div class="container">
	<div class="content">
		{#if error}
			<div class="error">{error.message}</div>
		{/if}

		{#if token}
			<LoggedInHome {token} {onError} {onLoginExpired} />
		{:else}<button id="login" on:click={login}>Log in</button>{/if}
	</div>
</div>
