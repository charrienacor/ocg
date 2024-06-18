<script lang="ts">
  import type { HTMLThAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  type $$Props = HTMLThAttributes;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<th
  class={cn(
    "sticky top-0 h-12 bg-rose-900 p-4 text-left align-middle text-sm uppercase text-gray-700 text-white",
    className,
  )}
  {...$$restProps}
>
  <slot />
</th>
