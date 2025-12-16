<script lang="ts">
import type { PageProps } from "./$types";
import { page } from "$app/stores";
import AinimeCard from "$lib/components/AinimeCard.svelte";
import { resolve } from "$app/paths";
let { data }: PageProps = $props();
</script>

<div class="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-8 font-sans text-gray-900 md:px-8 md:py-12">
    <div class="mx-auto max-w-7xl rounded-3xl bg-white/20 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/30 md:p-10">
        
        <header class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div >
                <a href={resolve("/")} class="mb-2 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-purple-100">
                    <span class="icon-[material-symbols--arrow-back] text-xl"></span>
                    Back to Home
                </a>
                <h1 class="bg-linear-to-r from-white to-purple-100 bg-clip-text leading-normal text-3xl font-extrabold text-transparent drop-shadow-sm md:text-5xl">
                    {$page.params.username}'s {$page.params.year} Log
                </h1>
            </div>
            
            <div class="rounded-xl bg-white/10 px-4 py-2 text-purple-100 ring-1 ring-white/20 backdrop-blur-md">
                <span class="font-bold">{data.subjects.length}</span> entries found
            </div>
        </header>

        {#if data.subjects.length > 0}
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pt-2">
                {#each data.subjects as subject}
                    <AinimeCard subject={subject} />
                {/each}
            </div>
        {:else}
            <div class="py-20 text-center">
                <p class="text-xl font-medium text-purple-100">No anime found for this year.</p>
                <a href="/" class="mt-4 inline-block rounded-xl bg-white px-6 py-2 font-bold text-purple-600 shadow-lg transition-transform hover:scale-105">Try another search</a>
            </div>
        {/if}
        
    </div>
    
    <div class="mt-8 text-center text-xs text-white/60">
        <p>© {new Date().getFullYear()} Annual Anime Log</p>
    </div>
</div>