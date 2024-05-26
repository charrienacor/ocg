<script lang="ts">
    import { goto } from "$app/navigation";
    import { DownloadIcon, PencilIcon, ScanSearchIcon } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";

    export let id: string;
</script>

<div class="flex">
<Button 
    href="/admin/records/{id}/download"
    data-tooltip-target="tooltip-light1"
    data-tooltip-style="light"
    variant="bigbutton"
    size="icon"
    class="mr-1">
    <DownloadIcon size={15} /></Button>
    <div
        id="tooltip-light1"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm">
        Download PDF
    </div>


<Button 
    data-tooltip-target="tooltip-light2"
    data-tooltip-style="light"
    variant="bigbutton"
    size="icon"
    class="mr-1"
    on:click={() => goto("/admin/records/edit")}>
    <PencilIcon size={15} /></Button>
    <div
        id="tooltip-light2"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm">
        Edit Data
    </div>

<Button 
    data-tooltip-target="tooltip-light3"
    data-tooltip-style="light"
    variant="bigbutton"
    size="icon"
    class="mr-1"
    on:click={() => goto("/admin/records/view")}>
    <ScanSearchIcon size={20} /></Button>
    <div
        id="tooltip-light3"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm">
        View Data
    </div>
</div>