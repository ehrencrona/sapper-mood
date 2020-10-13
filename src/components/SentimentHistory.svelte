<script lang="ts">
	import type { Day } from "../routes/api/_types";

	export let history: Day[];

	import scaleNames from "../scale";
</script>

<style lang="scss">
	ul {
		display: flex;
		justify-content: center;

		li {
			text-align: center;
			margin: 0.2em;

			$size: 8em;
			width: $size;
			height: $size;
			list-style: none;
			background-color: #b457d2;
			color: #f8f8f8;
			padding: 0.2em;
			border-radius: 2px;

			.date {
				margin-top: 0.1em;
			}

			.score {
				font-weight: 700;
				font-size: 2em;
				line-height: 1.1em;
				margin-top: 0.1em;
			}
		}
	}
</style>

<ul>
	{#each history as day}
		<li>
			<div class="date">{day.date}</div>
			<div class="score">{scaleNames[day.score]}</div>
		</li>
	{/each}
	{#if history.length == 0}You haven't reported your mood earlier days{/if}
</ul>
