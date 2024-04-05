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
  } from "lucide-svelte";

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
      background-color: #8e1537;
      color: white;
      padding-bottom: 20px;
    }

    body {
      font-family: Urbanist, sans-serif;
    }

    @media only screen and (min-width: 735px) {
      .threedots {
        top: 112px;
      }
    }

    @media only screen and (min-width: 736px) {
      .threedots {
        top: 40px;
      }
    }
  </style>
</head>

<div class="threedots absolute right-10 top-10 flex">
  <button
    id="dropdownMenuIconButton"
    data-dropdown-toggle="dropdownDots"
    class="inline-flex items-center rounded-full bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    type="button"
  >
    <svg
      class="h-5 w-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 4 15"
    >
      <path
        d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    </svg>
  </button>

  <div
    id="dropdownDots"
    class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
  >
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownMenuIconButton"
    >
      <li>
        <a
          href="/student-dashboard"
          class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          ><LayoutDashboardIcon size={15} />
          <p class="ml-3">Dashboard</p></a
        >
      </li>
      <li>
        <a
          href="/student-bis"
          class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          ><FileTextIcon size={15} />
          <p class="ml-3">Records</p></a
        >
      </li>
      <li>
        <a
          href="/student-appointment"
          class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CalendarDays size={15} />
          <p class="ml-3">Calendar</p></a
        >
      </li>
    </ul>
    <div class="py-2">
      <a
        href="/login-student"
        class="flex items-center px-4 py-2 text-base text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <LogOutIcon size={15} />
        <p class="ml-3">Log Out</p></a
      >
    </div>
  </div>
  <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
</div>

<div
  class="center relative top-1/2 mt-16 md:mt-20 flex flex-col gap-3 rounded-l bg-white px-8 py-8"
>
  <h1 class="center static text-red-950">Welcome {name}!</h1>
  <div class="center static mb-5 object-center text-center text-red-950">
    <p>You have successfully logged in to your account.</p>
  </div>
  <div class="relative flex flex-col justify-center gap-3 sm:flex-row">
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
      <p class="text-wrap text-xl">
        Schedule an Appointment <br />(Free Consultations)
      </p>
    </Button>
  </div>
  <Button
    variant="bigbutton"
    size="default"
    class="text-xl"
    on:click={() => goto("/login-student")}
  >
    Log Out
  </Button>
</div>
