<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";

let username = $state("");
let year = $state("2025");

const years = Array.from({ length: 12 }, (_, i) => (2015 + i).toString());

function handleSubmit() {
  if (username) {
    goto(`/${username}/${year}`);
  }
}
</script>

<svelte:head>
	<title>Annual Anime Log</title>
	<meta name="description" content="View your annual anime watching history" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 font-sans text-gray-900">
	<div class="w-full max-w-md overflow-hidden rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/30 transition-all duration-500 hover:shadow-purple-500/20">
		<div class="mb-8 text-center">
			<h1 class="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-sm">
				Annual Anime Log
			</h1>
			<p class="mt-2 text-purple-100 opacity-90">Track your journey through anime.</p>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
			<div class="group relative">
				<label for="username" class="mb-1 block text-sm font-medium text-white/90">Username</label>
				<input
					id="username"
					type="text"
					bind:value={username}
					placeholder="Enter your username"
					class="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white placeholder-purple-200 outline-hidden ring-1 ring-white/20 transition-all duration-300 focus:bg-white/20 focus:ring-2 focus:ring-purple-300/50"
					required
				/>
			</div>

			<div class="group relative">
				<label for="year" class="mb-1 block text-sm font-medium text-white/90">Year</label>
				<div class="relative">
					<select
						id="year"
						bind:value={year}
						class="w-full appearance-none rounded-xl border-0 bg-white/10 px-4 py-3 text-white outline-hidden ring-1 ring-white/20 transition-all duration-300 focus:bg-white/20 focus:ring-2 focus:ring-purple-300/50 [&>option]:text-gray-900"
					>
						{#each years as y}
							<option value={y}>{y}</option>
						{/each}
					</select>
					<!-- Down arrow icon -->
					<div class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-purple-100">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					</div>
				</div>
			</div>

			<button
				type="submit"
				class="group relative mt-2 w-full overflow-hidden rounded-xl bg-white px-4 py-3.5 text-lg font-bold text-purple-600 shadow-lg shadow-purple-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-purple-50 hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:outline-hidden active:scale-[0.98]"
			>
				<span class="relative z-10 flex items-center justify-center gap-2">
					View Log
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</span>
			</button>
		</form>
		
		<div class="mt-8 text-center text-xs text-purple-200/60">
			<p>© {new Date().getFullYear()} Annual Anime Log</p>
		</div>
	</div>
</div>