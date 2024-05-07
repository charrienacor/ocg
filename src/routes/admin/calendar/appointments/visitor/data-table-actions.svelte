<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  export let _id: any;
  import * as Dialog from "$lib/components/ui/dialog";
  import { Textarea } from "$lib/components/ui/textarea";
</script>

<div class="flex flex-row gap-1">
  <form method="POST" action="?/approve">
    <input hidden name="id" value={_id} />
    <input hidden name="table" value="Visitor_Appointments" />
    <Button type="submit">Approved</Button>
  </form>

  <Dialog.Root>
    <Dialog.Trigger>
      <Button>Rejected</Button>
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
</div>
