<script lang="ts">
  import type { PageServerData } from "./$types";
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import {
    AlignLeft,
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon
  } from "lucide-svelte";

  export let data: PageServerData;
  const name = data.name;
</script>

<head> 
  <style>
    header {
      display: flex;
      font-family: Urbanist, sans-serif;
      background-color: #8e1537;
      color: white;
      padding-bottom: 20px;
    }
  </style>
</head>

<div class="threedots absolute right-10 top-10">
  <button
    id="dropdownMenuIconButton"
    data-dropdown-toggle="dropdownDots"
    class="rounded-2xl bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    type="button"
  >
    <MenuIcon size={25} />
  </button>

  <div
    id="dropdownDots"
    class="menu z-10 hidden divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
  >
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownMenuIconButton"
    >
      <li>
        <a
          href="/student/dashboard"
          class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <LayoutDashboardIcon size={15} />
          <p class="ml-3">Dashboard</p>
        </a>
      </li>
      <li>
        <a
          href="/student/bis"
          class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <FileTextIcon size={15} />
          <p class="ml-3">BIS</p>
        </a>
      </li>
      <li>
        <a
          href="/student/appointment"
          class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CalendarDays size={15} />
          <p class="ml-3">Calendar</p>
        </a>
      </li>
    </ul>
    <div class="py-2">
      <a
        href="/api/logout"
        class="flex items-center px-5 py-2 text-base text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <LogOutIcon size={15} />
        <p class="ml-3">Log Out</p>
      </a>
    </div>
  </div>
  <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
</div>

<div
  class="center relative top-1/2 mt-16 flex flex-col gap-3 rounded-l bg-white px-8 py-8 md:mt-20"
>
  <h1 class="center static text-red-950">Welcome {name}!</h1>
  <div class="center static mb-5 object-center text-center text-red-950">
    <p>You have successfully logged in to your account.</p>
  </div>
  <div class="relative flex flex-col justify-center gap-3 sm:flex-row">
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/student/bis")}
    >
      <AlignLeft size={100} />
      <p class="text-wrap text-xl">
        Fill up the Background Information Sheet (BIS)
      </p>
    </Button>
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/student/appointment")}
    >
      <CalendarDays size={100} />
      <p class="text-wrap text-xl">
        Schedule an Appointment <br />(Free Consultations)
      </p>
    </Button>
  </div>
  <Button
    variant="bigbutton"
    size="default"
    class="text-xl"
    on:click={() => goto("/api/logout")}
  >
    Log Out
  </Button>
</div>
