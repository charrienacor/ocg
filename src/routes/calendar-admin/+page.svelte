<script lang="ts">
  import { CalendarDays, FileTextIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-svelte";
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

<div class="overflow-hidden">
  <div class="threedots absolute right-4 md:right-10">
    <button
      id="dropdownMenuIconButton"
      data-dropdown-toggle="dropdownDots"
      class="inline-flex items-center rounded-full bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      type="button">
      <svg
        class="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 4 15">
        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
      </svg>
    </button>

    <div id="dropdownDots" class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
        <li>
          <a href="/dashboard-admin" class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <LayoutDashboardIcon size={15} /> <p class="ml-3">Dashboard</p>
          </a>
        </li>
        <li>
          <a href="/records-admin" class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <FileTextIcon size={15} /> <p class="ml-3">Records</p>
          </a>
        </li>
        <li>
          <a href="/calendar-admin" class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <CalendarDays size={15} /> <p class="ml-3">Calendar</p>
          </a>
        </li>
      </ul>
      <div class="py-2">
        <a href="/login-admin" class="flex items-center px-4 py-2 text-base text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
          <LogOutIcon size={15} /> <p class="ml-3">Log Out</p>
        </a>
      </div>
    </div>
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
  </div>
  Appointment/Events Calendar (Admin Side)
</div>