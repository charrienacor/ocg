<script lang="ts">
  import { Html, Text } from "svelte-email";
  export let name: string;
  export let date: string;
  export let time: string;
  export let concern: string;
</script>

<Html lang="en">
  <Text>
    Dear {name}, <br />
    This is too confirm that you have made a scheduled appointment request with the
    following details: <br />
    Appointment Date: {date} <br />
    Appointment Time: {time} <br />
    Nature of Concern: {concern} <br />
    <br />
    Please wait for 2-3 working days for an email response confirming your appointment. <br />
    Thank you for your understanding and patience! <br />
    Best Regards, <br />
    <br />
    Office of Counseling and Guidance <br />
    University of the Philippines Baguio <br />
    Facebook: UP Baguio Patnubay <br />
    <br />
    
    <b>Confidentiality:</b> The information contained in this e-mail message is intended only for the personal and confidential use of the designated recipient(s) of the same. 
    If you are not an intended recipient of this message or an agent responsible for delivering it to an intended recipient, you are hereby notified that you have received this 
    message in error, and that any review, dissemination, distribution, or copying of this message, in whole or in part, is strictly prohibited. If you have received this message 
    in error, please delete it and all copies and notify us immediately by e-mail (ocg.upbaguio@up.edu.ph) or by telephone (442-0363) or by phone (0919-870-1955 or 0956-378-8834). 
    Thank you.
  </Text>
</Html>
