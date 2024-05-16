<script lang="ts">
  import { goto } from "$app/navigation";
  import { ShieldCheck, TreePalm, ShieldX, Trash2 } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  export let _id: any;
</script>

<div class="flex flex-row justify-center gap-1">
  <form method="POST" action="?/status">
    <input hidden name="id" value={_id} />
    <input hidden name="table" value="Counselors" />
    <input hidden name="status" value="Active" />
    <Button type="submit" size="icon">
      <Tooltip.Root>
        <Tooltip.Trigger><ShieldCheck class="size-6" /></Tooltip.Trigger>
        <Tooltip.Content>
          <p>Active</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Button>
  </form>
  <form method="POST" action="?/status">
    <input hidden name="id" value={_id} />
    <input hidden name="table" value="Counselors" />
    <input hidden name="status" value="On-leave" />
    <Button type="submit" size="icon">
      <Tooltip.Root>
        <Tooltip.Trigger><TreePalm class="size-6" /></Tooltip.Trigger>
        <Tooltip.Content>
          <p>On-leave</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Button>
  </form>
  <form method="POST" action="?/status">
    <input hidden name="id" value={_id} />
    <input hidden name="table" value="Counselors" />
    <input hidden name="status" value="Deny-Access" />
    <Button type="submit" size="icon">
      <Tooltip.Root>
        <Tooltip.Trigger><ShieldX class="size-6" /></Tooltip.Trigger>
        <Tooltip.Content>
          <p>Deny Access</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Button>
  </form>
  <form method="POST" action="?/delete">
    <input hidden name="id" value={_id} />
    <input hidden name="table" value="Counselors" />
    <Button type="submit" size="icon">
      <Tooltip.Root>
        <Tooltip.Trigger><Trash2 class="size-6" /></Tooltip.Trigger>
        <Tooltip.Content>
          <p>Delete Account</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Button>
  </form>
</div>
