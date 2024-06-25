<script lang="ts">
  import {
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    UserIcon,
    LogOutIcon,
    MenuIcon,
  } from "lucide-svelte";
  import type { PageServerData } from "./$types";
  import * as Tabs from "$lib/components/ui/tabs";
  import Student from "./student/data-table.svelte";
  import Visitor from "./visitor/data-table.svelte";

  export let data: PageServerData;
  let appointments = data.appointment;
  let v_appointments = data.v_appointment;
  let counselors = data.counselor;
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

<div class="threedots absolute right-4 md:right-10">
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

<div class="absolute m-auto left-0 right-0 w-[89vw]">
  <Tabs.Root value="student" class="mx-auto">
    <div class="mx-auto flex justify-between px-9">
      <h1 class="pt-12 font-bold sm:pt-5">MANAGE APPOINTMENTS</h1>
      <div class="pt-8">
        <Tabs.List class="">
          <Tabs.Trigger value="student">Student</Tabs.Trigger>
          <Tabs.Trigger value="visitor">Visitor</Tabs.Trigger>
        </Tabs.List>
      </div>
    </div>
    <div class="container mx-auto py-5">
      <Tabs.Content value="student">
        <Student {appointments} {counselors} />
      </Tabs.Content>
      <Tabs.Content value="visitor">
        <Visitor {v_appointments} {counselors} />
      </Tabs.Content>
    </div>
  </Tabs.Root>
</div>
