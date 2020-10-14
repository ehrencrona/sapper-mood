<script lang="ts">
	// This is what the user sees when logged in.

	import SentimentHistory from "../components/SentimentHistory.svelte";
	import SentimentScale from "../components/SentimentScale.svelte";
	import type { Day } from "../routes/api/_types";

	export let storeSentiment: (score: number) => void;
	export let today: number;
	export let history: Day[] = [];

	function setSentiment(newToday: number) {
		today = newToday;

		storeSentiment(today);
	}
</script>

<style lang="scss">
	.subtitle {
		margin-top: 2em;
		text-align: center;
		font-weight: 700;
	}

	.logout-container {
		$color: #c0c0c0;

		hr {
			width: 4em;
			margin-bottom: 0.6em;
			border-top: none;
			border-bottom-color: $color;
		}

		a {
			text-decoration: none;
			font-size: 0.8em;
		}

		margin-top: 4em;
		text-align: center;
		color: $color;
	}
</style>

<div class="subtitle">How do you feel today?</div>

<SentimentScale value={today} valueSelected={setSentiment} />

<div class="subtitle">How you felt earlier</div>

<SentimentHistory {history} />

<div class="logout-container">
	<hr /><a href="/logout">Log out</a>
</div>
