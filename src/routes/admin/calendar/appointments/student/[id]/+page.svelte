<script lang="ts">
  import type { PageServerData } from "./$types";
  import * as Card from "$lib/components/ui/card";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Button } from "$lib/components/ui/button";
  export let data: PageServerData;
  let appointment = data.appointments;
  let counselor = data.counselors;
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Appointment Details</Card.Title>
  </Card.Header>
  <Card.Content>
    <Card.Title>Student Name</Card.Title>
    <p>{appointment.Student_Name}</p>
    <Card.Title>Student Email</Card.Title>
    <p>{appointment.Student_Email}</p>
    <Card.Title>Student ID</Card.Title>
    <p>{appointment.Student_ID}</p>
    <Card.Title>Counselor</Card.Title>
    <p>{counselor.First_Name} {counselor.Middle_Name} {counselor.Last_Name}</p>
    <Card.Title>Appointment Date</Card.Title>
    <p>{appointment.Appointment_Date}</p>
    <Card.Title>Appointment Time</Card.Title>
    <p>{appointment.Appointment_Time}</p>
    <Card.Title>Nature of Concern</Card.Title>
    <p>{appointment.Nature_Of_Concern}</p>
    <Card.Title>Status</Card.Title>
    <p>{appointment.Status}</p>
    <Card.Title>Denial Remark</Card.Title>
    <p>{appointment.Denial_Remark}</p>
    <Card.Title>Session Remarks</Card.Title>
    <form method="POST" action="?/remark">
      <div class="py-1">
        <Textarea
          placeholder="Type your remarks here."
          name="session_remarks"
          bind:value={appointment.Session_Remarks}
        />
      </div>
      <div class="py-2">
        <Button type="submit">Add Remarks</Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
