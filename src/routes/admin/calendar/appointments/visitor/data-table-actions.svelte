<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  export let _id: any;
  import * as Dialog from "$lib/components/ui/dialog";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Check, X, Eye, Trash2 } from "lucide-svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { goto } from "$app/navigation";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
</script>

<div class="flex flex-row gap-1">
  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <Button size="icon">
        <Tooltip.Root>
          <Tooltip.Trigger><Check /></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Accept</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Approve Appointment?</AlertDialog.Title>
        <AlertDialog.Description>
          Appointment shall be approved and will send email notification of
          approval.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <form method="POST" action="?/approve">
          <input hidden name="id" value={_id} />
          <input hidden name="table" value="Visitor_Appointments" />

          <AlertDialog.Action type="submit">Continue</AlertDialog.Action>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>

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
        <input hidden name="table" value="Visitor_Appointments" />
        <div class="py-1">
          <Textarea placeholder="Type your remark here." name="reject_remark" />
        </div>
        <div class="py-2">
          <Button type="submit">Reject</Button>
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root>
  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <Button size="icon">
        <Tooltip.Root>
          <Tooltip.Trigger><Trash2 /></Tooltip.Trigger>
          <Tooltip.Content>
            <p>Delete Appointment</p>
          </Tooltip.Content>
        </Tooltip.Root>
      </Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Delete Appointment?</AlertDialog.Title>
        <AlertDialog.Description>
          Appointment shall be deleted from records.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <form method="POST" action="?/delete">
          <input hidden name="id" value={_id} />
          <input hidden name="table" value="Visitor_Appointments" />
          <AlertDialog.Action type="submit">Continue</AlertDialog.Action>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
  <Button size="icon" on:click={() => goto(`./appointments/visitor/${_id}`)}>
    <Tooltip.Root>
      <Tooltip.Trigger><Eye /></Tooltip.Trigger>
      <Tooltip.Content>
        <p>View Appointment Details</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </Button>
</div>
