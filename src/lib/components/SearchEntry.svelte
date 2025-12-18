<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import _ from "lodash";
    import { DateTime } from "luxon";
    let username = $state("");
    let year = $state(DateTime.now().year.toString());
    let isLoading = $state(false);

    function handleSubmit() {
        if (username) {
            isLoading = true;
            goto(resolve("/[username]/[year]", { username, year }));
        }
    }

    const thisYear = DateTime.now().year;
    const years = _.range(thisYear - 12, thisYear + 1).map((year) =>
        year.toString(),
    );
</script>

<div
    class="w-full max-w-md overflow-hidden rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/30 transition-all duration-500 hover:shadow-purple-500/20"
>
    <div class="mb-8 text-center">
        <h1
            class="leading-normal bg-linear-to-r from-white to-purple-100 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-sm"
        >
            Annual Anime Log
        </h1>
        <p class="mt-2 text-purple-100 opacity-90">
            Track your journey through anime.
        </p>
    </div>

    <form
        onsubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}
        class="space-y-6"
    >
        <div class="group relative">
            <label
                for="username"
                class="mb-2 block text-sm font-medium text-white/90"
                >Username</label
            >
            <input
                id="username"
                type="text"
                bind:value={username}
                placeholder="Enter your username"
                class="h-11 w-full leading-normal rounded-xl border-0 bg-white/10 px-4 py-3 text-white placeholder-purple-200 outline-hidden ring-1 ring-white/20 transition-all duration-300 focus:bg-white/20 focus:ring-2 focus:ring-purple-300/50 input input-ghost"
                required
            />
        </div>

        <div class="group relative">
            <label
                for="year"
                class="mb-2 block text-sm font-medium text-white/90">Year</label
            >
            <div class="relative">
                <input
                    id="year"
                    bind:value={year}
                    class="h-11 w-full leading-normal appearance-none rounded-xl border-0 bg-white/10 px-4 py-3 text-white outline-hidden ring-1 ring-white/20 transition-all duration-300 focus:ring-2 focus:ring-purple-300/50 input input-ghost"
                />
            </div>
        </div>

        <button
            type="submit"
            class="group relative mt-2 w-full overflow-hidden rounded-xl bg-white px-4 py-3.5 text-lg font-bold text-purple-600 shadow-lg shadow-purple-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-purple-50 hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:outline-hidden active:scale-[0.98]"
        >
            <div class="relative z-10 flex items-center justify-center gap-3">
                View Log
                {#if isLoading}
                    <span class="icon-[svg-spinners--ring-resize] text-xl"
                    ></span>
                {:else}
                    <span class="icon-[maki--arrow] text-center text-xl"></span>
                {/if}
            </div>
        </button>
    </form>
</div>
