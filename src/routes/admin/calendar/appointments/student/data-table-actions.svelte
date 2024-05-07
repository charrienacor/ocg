<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  export let _id: any;
  import * as Dialog from "$lib/components/ui/dialog";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Check, X, Eye } from "lucide-svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { goto } from "$app/navigation";
</script>

<div class="flex flex-row gap-1">
  <form method="POST" action="?/approve">
    <input hidden name="id" value={_id} />
    <input hidden name="table" value="Appointments" />
    <Button type="submit" size="icon">
      <Tooltip.Root>
        <Tooltip.Trigger><Check /></Tooltip.Trigger>
        <Tooltip.Content>
          <p>Accept</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Button>
  </form>

  <Dialog.Root>
    <Dialog.Trigger>
      <Button size="icon">
        <Tooltip.Root>
          <Tooltip.Trigger><X /></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Reject</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Reject Appointment Schedule Request</Dialog.Title>
        <Dialog.Description>
          The requested appointment schedule will be denied. Include remarks for
          denial below.
        </Dialog.Description>
      </Dialog.Header>
      <form method="POST" action="?/rejected">
        <input hidden name="id" value={_id} />
        <input hidden name="table" value="Appointments" />
        <div class="py-1">
          <Textarea placeholder="Type your remark here." name="reject_remark" />
        </div>
        <div class="py-2">
          <Button type="submit">Reject</Button>
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root>
  <Button size="icon" on:click={() => goto(`./appointments/student/${_id}`)}>
    <Tooltip.Root>
      <Tooltip.Trigger><Eye /></Tooltip.Trigger>
      <Tooltip.Content>
        <p>View Appointment Details</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </Button>
</div>
