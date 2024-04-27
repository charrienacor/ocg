<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLThAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<th
	class={cn(
		"sticky top-0 h-12 p-4 bg-rose-900 uppercase text-sm text-gray-700 text-white text-left align-middle",
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
