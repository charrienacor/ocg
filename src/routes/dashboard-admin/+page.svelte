<script lang="ts">
    import type { PageServerData } from "./$types";
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import { CalendarDays, FileTextIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-svelte";
      import { signInWithCustomToken } from "firebase/auth";
  
    // export let data: PageServerData;
  
    // const name = data.name;
    
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
  <div class="flex absolute top-10 right-10">
    <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
    </button>
        
        <div id="dropdownDots" class="absolute inset-2.5 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
              <li>
                <a href="/dashboard-admin" class="flex items-center px-4 py-2 text-black text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><LayoutDashboardIcon size={15} /><p class="ml-3">Dashboard</p></a>
              </li>
              <li>
                <a href="/records-admin" class="flex items-center px-4 py-2 text-black text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><FileTextIcon size={15} /> <p class="ml-3">Records</p></a>
              </li>
              <li>
                <a href="/calendar-admin" class="flex items-center px-4 py-2 text-black text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> <CalendarDays size={15} /> <p class="ml-3">Calendar</p></a>
              </li>
            </ul>
            <div class="py-2">
              <a href="/login-admin" class="flex items-center  px-4 py-2 text-sm text-gray-700 text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> <LogOutIcon size={15} /> <p class="ml-3">Log Out</p></a>
            </div>
        </div>
      <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
  </div>
    
  <div
    class="center relative top-1/2 flex flex-col gap-3 rounded-l bg-white px-8 py-8 mt-20"
  >
    <h1 class="center static text-red-950">Welcome [Admin]!</h1>
      <div class="center static mb-5 object-center text-center text-red-950">
        <p>You have successfully logged in to your account.</p>
      </div>
    <div class="relative flex flex-row justify-center gap-3">
      <Button
        variant="bigbutton"
        size="large"
        on:click={() => goto("/records-admin")}
      >
        <FileTextIcon size={100} />
        <p class="text-wrap text-xl">Access Student Records</p>
      </Button>
      <Button
        variant="bigbutton"
        size="large"
        on:click={() => goto("/calendar-admin")}
      >
        <CalendarDays size={110} />
        <p class="text-wrap text-xl">Check Calendar of Appointments</p>
      </Button>
    </div>
    <Button
      variant="bigbutton"
      size="default"
      class="text-xl"
      on:click={() => goto("/login-admin")}>
      Log Out
      </Button>
  </div>
  