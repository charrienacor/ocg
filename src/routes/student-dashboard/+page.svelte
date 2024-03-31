<script lang="ts">
  import type { PageServerData } from "./$types";
  import { goto } from "$app/navigation";

  export let data: PageServerData;

  const name = data.name;
  // const name: string = data.name;
</script>

<h1>Hi {name}~</h1>

<button
  class="danger lg bg-red-100"
  on:click={() => goto("/student-appointment")}
>
  Appointment Scheduler
</button>
