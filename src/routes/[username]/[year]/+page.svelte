<script lang="ts">
    import { page } from "$app/state";
    import AinimeCard from "$lib/components/AnimeCard.svelte";
    import { resolve } from "$app/paths";
    import {
        splitByQuarter,
        type SplitResult,
        type Platform,
    } from "$lib/anime-classify";
    import { fetchUserNickname } from "$lib/bgm-api-fetch";
    import type { PageProps } from "./$types";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import ScreenShotFab from "$lib/components/ScreenShotFab.svelte";

    let { data }: PageProps = $props();
    const { collectedSubjects } = data;

    let nickname = $state(page.params.username);
    let isCategorizedView = $state(false);
    let splitResult = $state<SplitResult | null>(null);
    let loadingSplit = $state(true);

    const categoryOrder: Platform[] = [
        "Movie",
        "TvQ1",
        "TvQ2",
        "TvQ3",
        "TvQ4",
        "Others",
    ];

    const categoryTitles: Record<Platform, string> = {
        Movie: "Movies 🎬",
        TvQ1: "Winter ❄️",
        TvQ2: "Spring 🌸",
        TvQ3: "Summer 🌻",
        TvQ4: "Fall 🍂",
        Others: "Others 📦",
    };

    const categoryColors: Record<Platform, string> = {
        Movie: "from-red-400 to-pink-500",
        TvQ1: "from-sky-400 to-indigo-500",
        TvQ2: "from-emerald-400 to-green-500",
        TvQ3: "from-amber-400 to-orange-500",
        TvQ4: "from-rose-400 to-red-500",
        Others: "from-gray-400 to-slate-500",
    };

    onMount(async () => {
        // Parallel execution
        const [nicknameRes, splitRes] = await Promise.all([
            page.params.username
                ? fetchUserNickname(page.params.username)
                : undefined,
            splitByQuarter(collectedSubjects),
        ]);

        if (nicknameRes) {
            nickname = nicknameRes;
        }

        splitResult = splitRes;
        loadingSplit = false;
    });
</script>

<div class="min-h-screen px-4 py-8 font-sans text-gray-900 md:px-8 md:py-12">
    <div
        class="mx-auto max-w-7xl rounded-3xl bg-white/20 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/30 md:p-10"
    >
        <header
            class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
            <div>
                <a
                    href={resolve("/")}
                    class="mb-2 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-purple-100"
                >
                    <span class="icon-[material-symbols--arrow-back] text-xl"
                    ></span>
                    Back to Home
                </a>
                <h1
                    class="bg-linear-to-r from-white to-purple-100 bg-clip-text leading-normal text-3xl font-extrabold text-transparent drop-shadow-sm md:text-5xl"
                >
                    {nickname}'s {page.params.year} Log
                </h1>
            </div>

            <div class="grid grid-cols-2 gap-4 place-content-center">
                <button
                    onclick={() => (isCategorizedView = !isCategorizedView)}
                    class="group relative flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 font-bold text-white ring-1 ring-white/20 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 disabled:opacity-50"
                    disabled={loadingSplit && !isCategorizedView}
                >
                    {#if loadingSplit}
                        <span class="icon-[svg-spinners--ring-resize] text-xl"
                        ></span>
                        Fetching...
                    {:else if isCategorizedView}
                        <span class="icon-[material-symbols--grid-view] text-xl"
                        ></span>
                        Show All
                    {:else}
                        <span class="icon-[material-symbols--category] text-xl"
                        ></span>
                        Categorize
                    {/if}
                </button>

                <div
                    class="relative flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 font-bold text-white ring-1 ring-white/20 backdrop-blur-md"
                >
                    <span class="icon-[f7--number]"></span>
                    <span class="font-bold">{collectedSubjects.length}</span> entries
                </div>
            </div>
        </header>

        {#if collectedSubjects.length > 0}
            <!-- View Logic -->
            {#if isCategorizedView && splitResult}
                <div class="space-y-16" in:fade={{ duration: 300 }}>
                    {#each categoryOrder as category}
                        {@const splittedSubjects = splitResult[category]}
                        {#if splittedSubjects.length > 0}
                            <section>
                                <div
                                    class="sticky top-4 z-10 mb-6 flex items-center gap-4"
                                >
                                    <h2
                                        class="rounded-2xl bg-gradient-to-r {categoryColors[
                                            category
                                        ]} px-6 py-2 text-2xl font-bold text-white shadow-lg"
                                    >
                                        {categoryTitles[category]}
                                        <span class="ml-2 text-lg opacity-80"
                                            >({splittedSubjects.length})</span
                                        >
                                    </h2>
                                    <div
                                        class="h-1 flex-1 rounded-full bg-white/10 backdrop-blur-md"
                                    ></div>
                                </div>
                                <div
                                    class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                                >
                                    {#each splittedSubjects as collectedSubject}
                                        <AinimeCard {collectedSubject} />
                                    {/each}
                                </div>
                            </section>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div
                    class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pt-2"
                    in:fade={{ duration: 300 }}
                >
                    {#each collectedSubjects as collectedSubject}
                        <AinimeCard {collectedSubject} />
                    {/each}
                </div>
            {/if}
        {:else}
            <div class="py-20 text-center">
                <p class="text-xl font-medium text-purple-100">
                    No anime found for this year.
                </p>
                <a
                    href={resolve("/")}
                    class="mt-4 inline-block rounded-xl bg-white px-6 py-2 font-bold text-purple-600 shadow-lg transition-transform hover:scale-105"
                    >Try another search</a
                >
            </div>
        {/if}
    </div>
    <ScreenShotFab />
</div>
