<script context="module" lang="ts">
	import type { Preload } from "@sapper/common";
	import SentimentHistory from "../components/SentimentHistory.svelte";

	export const preload: Preload = async function (this, page, session) {
		const res = await this.fetch(`/api/sentiment`);

		return await res.json();
	};
</script>

<script lang="ts">
	import SentimentScale from "../components/SentimentScale.svelte";
	import type { Day } from "./api/_types";

	let error: string = null;
	export let today, history: Day[];

	function setSentiment(newToday: number) {
		today = newToday;

		fetch("/api/sentiment", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ today })
		}).then((res) => {
			if (res.status != 200) {
				error = "Failed to store";
			} else {
				error = null;
			}
		});
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		margin-top: 2em;

		.content {
			margin: 0 auto;
		}

		.subtitle {
			margin-top: 2em;
			text-align: center;
			font-weight: 700;
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
			<div class="error">{error}</div>
		{/if}

		<div class="subtitle">How do you feel today?</div>

		<SentimentScale value={today} valueSelected={setSentiment} />

		<div class="subtitle">How you felt earlier</div>

		<SentimentHistory {history} />
	</div>
</div>
