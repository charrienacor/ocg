<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import {
    GraduationCap,
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    UsersRound,
    UserIcon,
    LogOutIcon,
    MenuIcon,
  } from "lucide-svelte";
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
  <h1 class="center static text-red-950">MANAGE APPOINTMENTS</h1>
  <div class="relative flex flex-col justify-center gap-3 sm:flex-row">
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/admin/calendar/walkin-student")}
    >
      <GraduationCap size={100} />
      <p class="text-wrap text-xl">Add Walk-in Appointment (Student)</p>
    </Button>
    <Button
      variant="bigbutton"
      size="large"
      on:click={() => goto("/admin/calendar/walkin-visitor")}
    >
      <UsersRound size={110} />
      <p class="text-wrap text-xl">Add Walk-in Appointment (Visitor)</p>
    </Button>
  </div>
  <div class="relative">
    <Button
      variant="bigbutton"
      size="default"
      class="text-xl w-full mb-3"
      on:click={() => goto("/admin/calendar/appointments")}
    >
      Edit Pending Appointments
    </Button>
  </div>
</div>

