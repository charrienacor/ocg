<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { UsersRound, GraduationCap } from "lucide-svelte";
</script>

<div class="relative overflow-x-hidden sm:mt-20">
  <div
    class="center relative top-1/2 flex flex-col gap-3 rounded-lg bg-white px-8 py-8"
  >
    <h1 class="center static">WELCOME!</h1>
    <div class="center static mb-5 object-center text-center">
      <p>You have entered the OCG Patnubay Aguhon. Please select a category.</p>
    </div>
    <div class="flex flex-col justify-center gap-3 lg:flex-row">
      <Button href="/admin/login" variant="bigbutton" size="large">
        <UsersRound size={100} class="inline-block" />
        <h1 class="inline-block">ADMINISTRATOR</h1>
        <p>To gain full control and access rights</p>
      </Button>
      <Button href="/student/login" variant="bigbutton" size="large">
        <GraduationCap size={100} class="inline-block" />
        <h1 class="inline-block">STUDENT</h1>
        <p class="text-wrap text-balance text-center md:text-nowrap">
          To fill out Backgorund Information Sheet (BIS) or avail free services
        </p>
      </Button>
    </div>
  </div>
</div>
