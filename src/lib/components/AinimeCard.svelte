<script lang="ts">
import type { components } from "$lib/schemas/bgm_private_api";

type SlimSubject = components["schemas"]["SlimSubject"];
let { subject }: { subject: SlimSubject } = $props();

let name = $state(subject.name);
let image = $state(subject.images?.large);
</script>

<div class="group relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-200 p-0.5 transition-all duration-300 hover:bg-[linear-gradient(45deg,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#9400d3)] hover:backdrop-brightness-200">
    <div class="relative h-full w-full overflow-hidden rounded-[inherit] bg-white">
        <img
            src={image}
            alt={name}
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h1 class="absolute bottom-4 left-4 right-4 text-lg font-bold text-white line-clamp-2">{name}</h1>
        </div>
    </div>
</div>
