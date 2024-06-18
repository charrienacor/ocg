<script lang="ts">
  import { Html, Text } from "svelte-email";
  export let name: any;
  export let date: any;
  export let time: any;
</script>

<Html lang="en">
  <Text>
    Hello {name}! <br /> This is to inform you that your requested appointment
    schdule on {date} at {time} with your requested counselor has been approved.
    Please proceed to visit the Office of Counseling and Guidance at the mentioned
    time. <br /> Thank you!
  </Text>
</Html>
