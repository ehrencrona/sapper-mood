<script lang="ts">
	import { onMount } from "svelte";

	import SentimentHistory from "../components/SentimentHistory.svelte";
	import SentimentScale from "../components/SentimentScale.svelte";
	import type { Day } from "../routes/api/_types";

	export let token: string;
	export let onError: (e: Error) => void;
  export let onLoginExpired: () => void;
    
	export let today,
		history: Day[] = [];

	async function getSentiment() {
		try {
			const res = await fetch(`/api/sentiment`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (res.status == 200) {
				({ today, history } = await res.json());
      }
      else if (res.status === 401) {
        onLoginExpired()
      }
		} catch (e) {
			onError(e);
		}
	}

	onMount(getSentiment);

	function setSentiment(newToday: number) {
		today = newToday;

		fetch("/api/sentiment", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ today })
		}).then((res) => {
			onError(res.status != 200?new Error("Failed to store"): null);
		});
	}
</script>

<style lang="scss">
	.subtitle {
		margin-top: 2em;
		text-align: center;
		font-weight: 700;
	}
</style>

<div class="subtitle">How do you feel today?</div>

<SentimentScale value={today} valueSelected={setSentiment} />

<div class="subtitle">How you felt earlier</div>

<SentimentHistory {history} />
