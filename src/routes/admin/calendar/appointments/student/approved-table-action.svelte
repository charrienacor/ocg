<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  export let _id: any;
</script>

<Button on:click={() => console.log(_id)}>Approved</Button>
