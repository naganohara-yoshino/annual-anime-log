<script lang="ts">
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

{#each data.subjects as subject}
    <h1>{subject.name}</h1>
{/each}