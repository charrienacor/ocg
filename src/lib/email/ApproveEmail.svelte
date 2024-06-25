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
    time. <br /> 
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
