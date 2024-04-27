<script lang="ts">
    import { goto } from "$app/navigation";
    import { PencilIcon } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<Button 
    data-tooltip-target="tooltip-light1"
    data-tooltip-style="light"
    variant="bigbutton"
    size="icon"
    class="mr-1"
    on:click={() => goto("/admin/profiles/edit")}>
    <PencilIcon size={15} />
</Button>
   
