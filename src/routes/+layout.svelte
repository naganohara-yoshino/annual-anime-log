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
	class="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 font-sans text-gray-900"
>
	<main>{@render children()}</main>
	<footer class="absolute inset-x-0 bottom-2 m-auto mt-8">
		<p class="text-center text-xs text-purple-200/60">
			© {thisYear} Annual Anime Log
		</p>
	</footer>
</div>
