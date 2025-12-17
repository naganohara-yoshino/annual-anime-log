<script lang="ts">
	import "./layout.css";
	import { DateTime } from "luxon";

	let { children } = $props();
	const thisYear = DateTime.now().year;
</script>

<svelte:head>
	<title>Annual Anime Log</title>
	<meta
		name="description"
		content="View your annual anime watching history"
	/>
</svelte:head>

<div
	class="min-h-screen flex flex-col justify-between bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4"
>
	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="mt-auto h-8">
		<p class="text-center text-xs text-purple-200/70">
			© {thisYear} Annual Anime Log
		</p>
	</footer>
</div>
