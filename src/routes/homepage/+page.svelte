<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { UsersRound, GraduationCap } from "lucide-svelte";
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
    }

    body {
      font-family: Urbanist, sans-serif;
    }
  </style>
</head>

<body class="relative mt-10">
  <div
    class="center relative top-1/2 flex flex-col gap-3 rounded-lg bg-white px-8 py-8"
  >
    <h1 class="center static">WELCOME!</h1>
    <div class="center static mb-5 object-center text-center">
      <p>You have entered the OCG Patnubay Aguhon. Please select a category.</p>
    </div>
    <div class="flex flex-col justify-center gap-3 lg:flex-row">
      <Button href="/login-admin" variant="bigbutton" size="large">
        <UsersRound size={100} class="inline-block" />
        <h1 class="inline-block">ADMINISTRATOR</h1>
        <p>To gain full control and access rights</p>
      </Button>
      <Button href="/login-student" variant="bigbutton" size="large">
        <GraduationCap size={100} class="inline-block" />
        <h1 class="inline-block">STUDENT</h1>
        <p class="text-balance text-center md:text-nowrap">
          To fill out Backgorund Information Sheet (BIS) or avail free services
        </p>
      </Button>
    </div>
  </div>
</body>
