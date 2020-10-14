<script lang="ts">
	// Allows rating today's mood.

	export let value: number;
	export let valueSelected: (value: number) => void;

	import scaleNames from "../scale";

	let scale: { name: string; value: number }[] = [];

	for (let i = 0; i < scaleNames.length; i++) {
		scale.push({
			name: scaleNames[i],
			value: i,
		});
	}
</script>

<style lang="scss">
	div {
		max-width: 400px;

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			li {
				list-style: none;
				width: 20%;
				min-width: 8em;
				height: 3em;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f0f0f0;
				margin: 0.4em;
				border-radius: 2px;
				cursor: pointer;
				transition: background-color 100ms ease-in,color 100ms ease-in;

				&.active {
					background-color: #3e00ff;
					color: white;
					font-weight: bold;
				}
			}
		}
	}
</style>

<div>
	<ul>
		{#each scale as option}
			<li
				class:active={option.value == value}
				on:click={() => valueSelected(option.value)}>
				<span>{option.name}</span>
			</li>
		{/each}
	</ul>
</div>
