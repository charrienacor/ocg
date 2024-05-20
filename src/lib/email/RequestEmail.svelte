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
    Visitor Name: {name} <br />
    Email: {email} <br />
    Appointment Date: {date} <br />
    Appointment Time: {time} <br />
    Nature of Concern: {concern} <br />
  </Text>
</Html>
