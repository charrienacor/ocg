<script lang="ts">
  import type { PageServerData } from "./$types";
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { AlignLeft, CalendarDays } from "lucide-svelte";
    import { signInWithCustomToken } from "firebase/auth";

  export let data: PageServerData;

  const name = data.name;
</script>

<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap"
    rel="stylesheet"
  />

  <style>
    header {
        display: flex;
        font-family: Urbanist, sans-serif;
        background-color:#8e1537;
        color: white;
        padding-bottom: 20px;
      }

    body {
      font-family: Urbanist, sans-serif;
    }
  </style>
</head>
<div
  class="center relative top-1/2 flex flex-col gap-3 rounded-l bg-white px-8 py-8 mt-20"
>
  <h1 class="center static text-red-950">Welcome {name}!</h1>
    <div class="center static mb-5 object-center text-center text-red-950">
      <p>You have successfully logged in to your account.</p>
    </div>
  <div class="relative flex flex-row justify-center gap-3">
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/student-bis")}
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
      <p class="text-wrap text-xl">Schedule an Appointment <br>(Free Consultations)</p>
    </Button>
  </div>
  <Button
    variant="bigbutton"
    size="default"
    class="text-xl"
    on:click={() => goto("/login-student")}>
    Log Out
    </Button>
</div>
