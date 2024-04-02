<script lang="ts">
  import type { PageServerData } from "./$types";
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { AlignLeft, CalendarDays } from "lucide-svelte";

  export let data: PageServerData;

  const name = data.name;
  // const name: string = data.name;
</script>

<div
  class="center relative top-1/2 flex flex-col gap-3 rounded-l bg-white px-8 py-8"
>
  <h1>Hi {name}~</h1>
  <div class="relative flex flex-row justify-center gap-3">
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/student-appointment")}
    >
      <AlignLeft size={100} />
      <p class="text-wrap text-xl">
        Fill up the Background Information Sheet (BIS)
      </p>
    </Button>
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/student-appointment")}
    >
      <CalendarDays size={100} />
      <p class="text-wrap text-xl">Schedule an Appointment</p>
      <p class="text-xl">(Free Consultations)</p>
    </Button>
  </div>
</div>
