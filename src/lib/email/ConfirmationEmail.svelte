<script lang="ts">
  import { Html, Text } from "svelte-email";
  export let name: string;
  export let date: string;
  export let time: string;
  export let concern: string;
</script>

<Html lang="en">
  <Text>
    Hello {name}, <br />
    This is too confirm that you have made a scheduled appointment request with the
    following details: <br />
    Appointment Date: {date} <br />
    Appointment Time: {time} <br />
    Nature of Concern: {concern} <br />
    <br />
    Please wait for an email response confirming your appointment. <br />
    Thank you!
  </Text>
</Html>
