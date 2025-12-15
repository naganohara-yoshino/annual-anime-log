<script lang="ts">
import type { PageProps } from "./$types";
import { page } from "$app/stores";
import AinimeCard from "$lib/components/AinimeCard.svelte";

let { data }: PageProps = $props();
</script>

<div class="min-h-screen bg-gray-950 px-8 py-12 text-white">
    <div class="mb-12">
        <h1 class="mb-4 text-7xl font-black uppercase tracking-tighter">
            Report for {$page.params.username} at {$page.params.year}
        </h1>
        <div class="relative h-1 w-full bg-blue-500">
            <span class="absolute -top-3 left-0 bg-blue-500 px-2 text-sm font-bold text-white">
                <!-- {$page.params.year} -->
            </span>
        </div>
    </div>

    <div class="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {#each data.subjects as subject}
            <AinimeCard subject={subject} />
        {/each}
    </div>
</div>