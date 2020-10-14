<script lang="ts">
	// This is what the user sees when logged in.

	import MoodHistory from "../components/MoodHistory.svelte";
	import MoodScale from "../components/MoodScale.svelte";
	import type { Day } from "../types";

	export let storeMood: (score: number) => void;
	export let today: number;
	export let history: Day[] = [];

	function setMood(newToday: number) {
		today = newToday;

		storeMood(today);
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

<MoodScale value={today} valueSelected={setMood} />

<div class="subtitle">How you felt earlier</div>

<MoodHistory {history} />

<div class="logout-container">
	<hr /><a href="/logout">Log out</a>
</div>
