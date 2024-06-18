<script lang="ts">
  import DataTable from "./data-table.svelte";
  import {
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    UserIcon,
    SearchIcon,
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

<h1 class="pb-5 pt-12 font-bold sm:pt-5">STUDENT RECORDS</h1>
<form class="mx-auto w-full">
  <label
    for="default-search"
    class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Search</label
  >
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
    >
      <SearchIcon size={20} />
    </div>
    <input
      type="search"
      id="default-search"
      class="text-md mb-10 block w-full rounded-md border p-4 ps-10 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
      placeholder="Search"
      required
    />
    <button
      type="submit"
      class="absolute bottom-2.5 end-2.5 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-black"
      >Search</button
    >
  </div>
</form>

<div
  class="table-wrap relative block max-h-96 overflow-x-auto rounded-lg border border-none"
>
  <DataTable />
</div>
