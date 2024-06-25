<script lang="ts">
  import { Html, Text } from "svelte-email";
  export let name: string;
  export let date: string;
  export let time: string;
  export let concern: string;
</script>

<Html lang="en">
  <Text>
    Dear {name}, <br /><br />
    Thank you for reaching out to us! For confirmation, you have made a scheduled appointment request with the
    following details: <br />
    <b style="padding-left: 50px;">Appointment Date:</b> {date} <br />
    <b style="padding-left: 50px;">Appointment Time:</b> {time} <br />
    <b style="padding-left: 50px;">Nature of Concern:</b> {concern} <br />

    If there are any errors in the information above, please submit another appointment request through the website (http://localhost:5173/homepage). <br />
    Otherwise, please wait for 2-3 working days for an email response regarding your appointment. <br />
    Thank you for your understanding and patience! <br />
    <hr>
    <hr>
    Best Regards, <br />
    <br />
    Office of Counseling and Guidance <br />
    University of the Philippines Baguio <br />
    Facebook: UP Baguio Patnubay <br />
    <br />

    <p  style="font-size: 11px;"><b>Confidentiality:</b> The information contained in this e-mail message is intended only for the personal and confidential use of the designated recipient(s) of the same. 
    If you are not an intended recipient of this message or an agent responsible for delivering it to an intended recipient, you are hereby notified that you have received this 
    message in error, and that any review, dissemination, distribution, or copying of this message, in whole or in part, is strictly prohibited. If you have received this message 
    in error, please delete it and all copies and notify us immediately by e-mail (ocg.upbaguio@up.edu.ph) or by telephone (442-0363) or by phone (0919-870-1955 or 0956-378-8834). 
    Thank you.</p>
  </Text>
</Html>
