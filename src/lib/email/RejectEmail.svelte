<script lang="ts">
  import { Html, Text } from "svelte-email";
  export let name: any;
  export let date: any;
  export let time: any;
  export let remark: any;
</script>

<Html lang="en">
  <Text>
    Dear {name},  <br /><br />
    
    Thank you for submitting an appointment request. We sincerely appreciate the time and courage it took for you to reach out to us.
    After carefully checking the schedules of the guidance counselors, we <u>regret to inform you</u> that your requested appointment schedule 
    on {date} at {time} with your requested counselor has been <b>rejected</b> with the following remarks from the counselor: <br /> <br />
    <i style="padding-left: 50px;">{remark}</i><br />
    <br /> 
    If you are available on any other timeslot, please submit another appointment request through the website (http://localhost:5173/homepage). <br />
    If you have any questions, please don't hesitate to reach out to us. Thank you for your understanding and patience! <br />
    <hr>
    <hr>
    Best Regards, <br />
    <br />
    Office of Counseling and Guidance <br />
    University of the Philippines Baguio <br />
    Facebook: UP Baguio Patnubay <br />
    <br />
    
    <p style="font-size: 11px;">
      <b>Confidentiality:</b> The information contained in this e-mail message is intended only for the personal and confidential use of the designated recipient(s). 
      If you are not an intended recipient of this message, you are hereby notified that you have received this message in error and any review, dissemination, distribution, 
      or copying of this message, in whole or in part, is strictly prohibited. If you are not the intended recipient, please delete this email and all copies. If you have 
      received this message in error, please notify us immediately by e-mail (ocg.upbaguio@up.edu.ph) or by telephone (442-0363) or by phone (0919-870-1955 or 0956-378-8834). 
      Thank you.
    </p>
  </Text>
</Html>
