<script context="module" lang="ts">
	export async function preload() {
		let today: number;
		let history: Day[];
		let sessionExpired = false;
		let error: Error = null;

		try {
			const res = await this.fetch(`/api/mood`);

			if (res.status == 200) {
				({ today, history } = await res.json());
			} else if (res.status === 401) {
				sessionExpired = true;
			}
		} catch (e) {
			error = e;
		}

		return { today, history, sessionExpired, error };
	}
</script>

<script lang="ts">
	import LoggedInHome from "../components/LoggedInHome.svelte";
	import { stores } from "@sapper/app";
	import type { Day } from "../types";

	export let today: number;
	export let history: Day[];
	export let sessionExpired: boolean;
	export let error: Error = null;

	const onError = (e: Error) => {
		error = e;
	};

	const onLoginExpired = () => {
		sessionExpired = true;
		onError(new Error("Your session has expired. Please log in again."));
	};

	const storeMood = (score: number) => {
		fetch("/api/mood", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ today: score })
		}).then((res) => {
			if (res.status == 401) {
				onLoginExpired();
			} else {
				onError(res.status != 200 ? new Error("Failed to store") : null);
			}
		});
	};

	const { session } = stores();
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
	<title>Mood Tracker</title>
</svelte:head>

<div class="container">
	<div class="content">
		{#if error}
			<div class="error">{error.message}</div>
		{/if}

		{#if $session.user && !sessionExpired}
			<LoggedInHome {storeMood} {today} {history} />
		{:else}
			<button
				id="login"
				on:click={() => (document.location.href = '/login')}>Log in</button>
		{/if}
	</div>
</div>
