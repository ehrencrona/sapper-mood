<script lang="ts">
	// Shows previous days' mood.

	import type { Day } from "../types";

	export let history: Day[];

	import scaleNames from "../scale";
</script>

<style lang="scss">
	ul {
		display: flex;
		justify-content: center;
		padding-left: 0;

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

	.nodata {
		margin-top: 0.8em;
		text-align: center;
	}
</style>

{#if history.length > 0}
	<ul>
		{#each history as day}
			<li>
				<div class="date">{day.date}</div>
				<div class="score">{scaleNames[day.score]}</div>
			</li>
		{/each}
	</ul>
{:else}
	<div class="nodata">You haven't reported your mood earlier days</div>
{/if}
