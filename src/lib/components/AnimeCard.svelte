<script lang="ts">
    import type { components } from "$lib/schemas/bgm-public-api";
    type SubjectCollection = components["schemas"]["UserSubjectCollection"];

    let { collectedSubject }: { collectedSubject: SubjectCollection } =
        $props();

    const name = collectedSubject.subject?.name;
    const imageUrl = collectedSubject.subject?.images?.large ?? "";
</script>

<div
    class="group relative aspect-2/3 w-full overflow-hidden rounded-xl border-2 border-white hover:border-amber-500 hover:shadow-2xl"
>
    <div
        class="relative h-full w-full overflow-hidden rounded-[inherit] bg-white"
    >
        <img
            src={imageUrl}
            alt={name}
            class="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
        />

        <div
            class="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
            <h1
                class="absolute bottom-4 left-4 right-4 text-lg font-bold text-white line-clamp-2"
            >
                {name}
            </h1>
        </div>
    </div>
</div>
