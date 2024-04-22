<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import {
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    UserIcon,
    LogOutIcon,
  } from "lucide-svelte";
  import type { PageServerData } from "./$types";
    import { redirect } from "@sveltejs/kit";

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

    .menu {
        right: -55px;
      }

    @media only screen and (max-width: 635px){
      .menu {
        right: -115px;
        top: 10px;
      }
    } 

    @media only screen and (min-width: 636px) and (max-width: 1025px) {
      .menu {
        right: -110px;
      }
    }

    @media only screen and (min-width: 1020px) and (max-width: 1050px) {
      .menu {
        right: -105px;
      }
    }

    @media only screen and (min-width: 1051px) and (max-width: 1068px) {
      .menu {
        right: -93px;
      }
    }

    @media only screen and (min-width: 1069px) and (max-width: 1095px) {
      .menu {
        right: -83px;
      }
    }

    @media only screen and (min-width: 1096px) and (max-width: 1115px) {
      .menu {
        right: -70px;
      }
    }
    
    @media only screen and (min-width: 0px) {
      .threedots {
        top: 110px;
        right: 15px;
      }
    }

    @media only screen and (min-width: 500px) {
      .threedots {
        top: 30px;
      }
    }

    @media only screen and (min-width: 654px) {
      .threedots {
        top: 120px;
        right: 15px;
      }
    }

    @media only screen and (min-width: 735px) {
      .threedots {
        top: 30px;
        right: 15px;
      }
    }
  </style>
</head>

<div class="threedots absolute right-10 top-10">
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
    class="menu z-10 hidden divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
  >
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownMenuIconButton"
    >
      <li>
        <a
          href="/admin/dashboard"
          class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <LayoutDashboardIcon size={15} />
          <p class="ml-3">Dashboard</p>
        </a>
      </li>
      <li>
        <a
          href="/admin/records"
          class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <FileTextIcon size={15} />
          <p class="ml-3">Records</p>
        </a>
      </li>
      <li>
        <a
          href="/admin/calendar"
          class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CalendarDays size={15} />
          <p class="ml-3">Calendar</p>
        </a>
      </li>
      <li>
        <a
          href="/admin/profiles"
          class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <UserIcon size={15} />
          <p class="ml-3">Accounts</p>
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
      on:click={() => goto("/admin/records")}
    >
      <FileTextIcon size={100} />
      <p class="text-wrap text-xl">Access Student Records</p>
    </Button>
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/admin/calendar")}
    >
      <CalendarDays size={110} />
      <p class="text-wrap text-xl">Check Calendar of Appointments</p>
    </Button>
  </div>
  <div class="gap-4 md:grid md:grid-cols-2">
    <Button
      variant="bigbutton"
      size="default"
      class="text-xl w-full mb-3"
      on:click={() => goto("/admin/profiles")}
    >
      Manage Admin Accounts
    </Button>
    <Button
      variant="bigbutton"
      size="default"
      class="text-xl w-full"
      on:click={() => goto("/api/logout")}
    >
      Log Out
    </Button>
  </div>
</div>

