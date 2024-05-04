<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  export let _id: any;
</script>

<form method="POST" action="?/approve">
  <input hidden name="id" value={_id} />
  <Button type="submit">Approved</Button>
</form>
