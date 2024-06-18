<script lang="ts">
  import type { HTMLTableAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  type $$Props = HTMLTableAttributes;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div
  class="table-warp relative block max-h-96 w-full overflow-x-auto rounded-md border-2"
>
  <table
    class={cn("w-full caption-bottom text-sm", className)}
    {...$$restProps}
  >
    <slot />
  </table>
</div>
