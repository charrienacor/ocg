<script lang="ts">
  import { Html, Text } from "svelte-email";
  export let name: any;
  export let date: any;
  export let time: any;
  export let email: any;
  export let concern: any;
</script>

<Html lang="en">
  <Text>
    A new appointment request was made with the following details: <br />
    <b style="padding-left: 50px;">Name:</b> {name} <br />
    <b style="padding-left: 50px;">Email:</b> {email} <br />
    <b style="padding-left: 50px;">Appointment Date:</b> {date} <br />
    <b style="padding-left: 50px;">Appointment Time:</b> {time} <br />
    <b style="padding-left: 50px;">Nature of Concern:</b> {concern} <br />
    Please login on the UPB OCG Aguhon (http://localhost:5173/admin/login) to accept/reject the appointment. <br />
    Thank you!
  </Text>
</Html>
