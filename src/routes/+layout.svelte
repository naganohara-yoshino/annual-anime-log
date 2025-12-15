<script lang="ts">
import "./layout.css";

let { children } = $props();
</script>

<div>
	<main>{@render children()}</main>
</div>