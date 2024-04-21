<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card";
  import { CalendarDays, FileTextIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-svelte";
  export let data: PageServerData;
  let name = data.name;
  let email = data.email;
  let counselors = data.counselor;
  console.log(counselors);
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

    @media only screen and (min-width: 0px) {
      .threedots {
        top: 115px;
        right: 15px;
      }
    }

    @media only screen and (min-width: 610px) and (max-width: 650px) {
      .threedots {
        top: 158px;
        right: 15px;
      }
    }

    @media only screen and (min-width: 651px) and (max-width: 735px) {
      .threedots {
        top: 125px;
        right: 15px;
      }
    } 

    @media only screen and (min-width: 736px) {
      .threedots {
        top: 30px;
      }
    }
  </style>
</head>

<div class="threedots absolute right-10 top-10">
  <button
    id="dropdownMenuIconButton"
    data-dropdown-toggle="dropdownDots"
    class="rounded-full bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

  <div id="dropdownDots" class="z-10 hidden -right-14 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
      <li>
        <a href="/student/dashboard" class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <LayoutDashboardIcon size={15} />
          <p class="ml-3">Dashboard</p>
        </a>
      </li>
      <li>
        <a href="/student/bis" class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <FileTextIcon size={15} />
          <p class="ml-3">BIS</p>
        </a>
      </li>
      <li>
        <a href="/student/appointment" class="flex items-center px-5 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <CalendarDays size={15} />
          <p class="ml-3">Calendar</p>
        </a>
      </li>
    </ul>
    <div class="py-2">
      <a href="/api/logout" class="flex items-center px-5 py-2 text-base text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
        <LogOutIcon size={15} />
        <p class="ml-3">Log Out</p>
      </a>
    </div>
  </div>
  <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
</div>

<div class="w-full flex flex-col lg:flex-row gap-3 mt-20 md:mt-7">
  <div class="box bg-white rounded shadow-xl mb-5 w-full lg:p-1 lg:mr-5 lg:w-1/3">
    <h1 class="p-4 text-xl text-center">WELCOME!</h1>
    <p class="pt-0.5 px-4">Here you can schedule an appointment for consultation in the OCG. To book an appointment:</p>
      <br>
    <p class="pt-0.5 px-4"><b>Step 1:</b> Click on a specific day to see the available time and counselor.</p>
      <br>
    <p class="pt-0.5 px-4"><b>Step 2:</b> Click on the "Book an appointment" button to schedule an appointment.</p>
      <br>
    <p class="pt-0.5 px-4"><b>Step 3:</b> Submit the request form. </p>
      <br>
    <p class="pt-0.5 px-4 pb-4"><b>Step 4:</b> Wait for an email updating you on the status (accepted/rejected) of your appointment.</p>
  </div>

  <div class="box flex flex-col items-center">
    <div class="bg-white p-2 rounded shadow-xl w-[290px]">
      <Calendar></Calendar>
    </div> 

    <button 
      id="dropdown1"
      data-dropdown-toggle="dropdownDots1"
      type="button">
        <Button class="relative text-wrap text-xl top-10 mb-5 md:mb-14 lg:w-[290px]">Book an Appointment</Button>
    </button>

    <div id="dropdownDots1" class="relative hidden">
      <Card.Root class="absolute w-[380px] -right-48 top-6 sm:top-0 xl:right-44 lg:-top-[440px] ">
        <Card.Header>
          <Card.Title>Book an Appointment</Card.Title>
        </Card.Header>
        <Card.Content>
          <SettingsForm data={data.form} {name} {email} {counselors} />
        </Card.Content>
      </Card.Root>
    </div>
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
  </div>

  <div class="box bg-white rounded shadow-xl w-full mt-10 md:mt-0 lg:p-1 lg:ml-5 lg:w-1/3">
    <h1 class="p-4 text-xl text-left lg:text-center">Counselor Schedules for [Current Date]</h1>
      <hr class="mx-4 h-3">
    <p class="pl-5"><b>Ma'am Liza Ngaio </b></p>
      <p class="pl-10 text-sm">9:00 - Unavailable </p>
      <p class="pl-10 text-sm">10:30 - Available </p>
      <p class="pl-10 text-sm">2:00 - Unavailable </p>
      <p class="pl-10 text-sm">3:00 - Unavailable </p>
      <br>
    <p class="pl-5"><b>Ma'am Au Parcasio </b> <br></p>
      <p class="pl-10 text-sm">8:15 - Unavailable </p>
      <p class="pl-10 text-sm">10:15 - Available </p>
      <p class="pl-10 text-sm">2:15 - Unavailable </p>
      <br>
    <p class="pl-5"><b>Ma'am Julie Tuguinay</b></p>
    <p class="pl-10 text-sm">8:30 - Unavailable </p>
    <p class="pl-10 text-sm">9:30 - Available </p>
    <p class="pl-10 text-sm">10:30 - Unavailable </p>
    <p class="pl-10 text-sm">2:00 - Unavailable </p>
    <p class="pl-10 text-sm pb-4">3:30 - Unavailable </p>
  </div>
</div>