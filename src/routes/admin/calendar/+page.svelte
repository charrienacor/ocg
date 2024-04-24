<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card";
  import {
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    LogOutIcon,
  } from "lucide-svelte";
  export let data: PageServerData;
  let name = data.name;
  let email = data.email;
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

        .tb-std {
            width: 100%;
            border-collapse: collapse;
        }

        .th-std, .td-std {
            border-bottom: 1.5px solid #8e1537;
            padding: 8px;
            text-align: left;
        }

        .th-std {
            background-color: #8e1537;
            color: white;
            position: sticky;
            top: 0;
        }

        .tr-std:nth-child(even) {
            background-color: rgb(229 231 235);
        }

        .tr-std:nth-child(odd) {
            background-color: white;
        }
  </style>
</head>

<div class="threedots absolute right-10 top-10">
  <button
    id="dropdownMenuIconButton"
    data-dropdown-toggle="dropdownDots"
    class="rounded-full bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
    class="-right-14 z-10 hidden divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
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

<!-- WALK-IN APPOINTMENTS TAB -->
<div class="mt-20 flex h-[870px] flex-col gap-3 md:mt-7 lg:flex-row">
  <div
    class="box mb-5 w-full h-full rounded bg-white shadow-xl lg:mr-5 lg:w-1/3 lg:p-5">
    <!-- <h1 class="p-4 text-center text-xl">WALK-IN APPOINTMENTS</h1> -->
    <p><b>Put here the details of any client who had a walk-in appointment on OCG to add it on the list of appointments made.</b></p>
    <div class="walk-in">
      <Card.Root
        class="w-full sm:top-0 lg:-top-[440px] xl:right-44" style="margin-top: 20px;"
      >
        <Card.Header>
          <Card.Title>Walk-In Appointments</Card.Title>
        </Card.Header>
        <Card.Content>
          <SettingsForm data={data.form} {name} {email} {counselors} />
        </Card.Content>
      </Card.Root>
    </div>
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
  </div>

<!-- CALENDAR AND COUNSELOR SCHEDULE TAB -->
  <div class="box flex flex-col items-center">
    <div class="w-[290px] rounded bg-white p-2 shadow-xl">
      <Calendar></Calendar>
    </div>

    <div
    class="box mt-10 w-[290px] h-full rounded bg-white shadow-xl">
    <h1 class="p-4 text-left text-xl lg:text-center">
      Counselor Schedules for [Current Date]
    </h1>
    <hr class="mx-4 h-3" />
    <p class="pl-5"><b>Ma'am Liza Ngaio </b></p>
    <p class="pl-10 text-sm">9:00 - Unavailable</p>
    <p class="pl-10 text-sm">10:30 - Available</p>
    <p class="pl-10 text-sm">2:00 - Unavailable</p>
    <p class="pl-10 text-sm">3:00 - Unavailable</p>
    <br />
    <p class="pl-5"><b>Ma'am Au Parcasio </b> <br /></p>
    <p class="pl-10 text-sm">8:15 - Unavailable</p>
    <p class="pl-10 text-sm">10:15 - Available</p>
    <p class="pl-10 text-sm">2:15 - Unavailable</p>
    <br />
    <p class="pl-5"><b>Ma'am Julie Tuguinay</b></p>
    <p class="pl-10 text-sm">8:30 - Unavailable</p>
    <p class="pl-10 text-sm">9:30 - Available</p>
    <p class="pl-10 text-sm">10:30 - Unavailable</p>
    <p class="pl-10 text-sm">2:00 - Unavailable</p>
    <p class="pb-4 pl-10 text-sm">3:30 - Unavailable</p>
    </div>
    
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
  </div>

  <!-- COUNSELORS SCHEDULE TAB -->
  <div
    class="box mt-10 h-[870px] rounded md:mt-0 lg:ml-5 lg:w-1/3 lg:p-1" style="width: 100%">
    <div class="student-appointments shadow-xl rounded" style="height: 50%; overflow-y: auto;">
      <table class="tb-std">
        <thead>
            <tr class="tr-std">
                <th class="th-std">Student Appointments on mm/dd/yyyy</th>
            </tr>
        </thead>
        <tbody>
            <tr class="tr-std">
                <td class="td-std">
                  <p>Student Name: <span id="stdname">Insert Here</span></p>
                  <p>Student Email: <span id="stdemail">Insert Here</span></p>
                  <p>Student Number: <span id="stdnum">Insert Here</span></p>
                  <p>Guidance Counselor: <span id="counselor">Insert Here</span></p>
                  <p>Appointment Date: <span id="appdate">Insert Here</span></p>
                  <p>Appointment Time: <span id="apptime">Insert Here</span></p>
                  <p>Nature of Concern: <span id="concern">Insert Here</span></p>
                </td>
            </tr>
            <tr class="tr-std">
              <td class="td-std">
                <p>Student Name: <span id="stdname">Insert Here</span></p>
                <p>Student Email: <span id="stdemail">Insert Here</span></p>
                <p>Student Number: <span id="stdnum">Insert Here</span></p>
                <p>Guidance Counselor: <span id="counselor">Insert Here</span></p>
                <p>Appointment Date: <span id="appdate">Insert Here</span></p>
                <p>Appointment Time: <span id="apptime">Insert Here</span></p>
                <p>Nature of Concern: <span id="concern">Insert Here</span></p>
              </td>
            </tr>
            <tr class="tr-std">
              <td class="td-std">
                <p>Student Name: <span id="stdname">Insert Here</span></p>
                <p>Student Email: <span id="stdemail">Insert Here</span></p>
                <p>Student Number: <span id="stdnum">Insert Here</span></p>
                <p>Guidance Counselor: <span id="counselor">Insert Here</span></p>
                <p>Appointment Date: <span id="appdate">Insert Here</span></p>
                <p>Appointment Time: <span id="apptime">Insert Here</span></p>
                <p>Nature of Concern: <span id="concern">Insert Here</span></p>
              </td>
            </tr>
        </tbody>
    </table>
    </div>
    
    <!-- Visitor Table -->
    <div class="visitor-appointments shadow-xl rounded"  style="height: 45%; overflow-y: auto; margin-top: 45px;">
      <table class="tb-std">
        <thead>
            <tr class="tr-std">
                <th class="th-std">Visitor Appointments on mm/dd/yyyy</th>
            </tr>
        </thead>
        <tbody>
            <tr class="tr-std">
                <td class="td-std">
                  <p>Student Name: <span id="stdname">Insert Here</span></p>
                  <p>Student Email: <span id="stdemail">Insert Here</span></p>
                  <p>Student Number: <span id="stdnum">Insert Here</span></p>
                  <p>Guidance Counselor: <span id="counselor">Insert Here</span></p>
                  <p>Appointment Date: <span id="appdate">Insert Here</span></p>
                  <p>Appointment Time: <span id="apptime">Insert Here</span></p>
                  <p>Nature of Concern: <span id="concern">Insert Here</span></p>
                </td>
            </tr>
            <tr class="tr-std">
              <td class="td-std">
                <p>Student Name: <span id="stdname">Insert Here</span></p>
                <p>Student Email: <span id="stdemail">Insert Here</span></p>
                <p>Student Number: <span id="stdnum">Insert Here</span></p>
                <p>Guidance Counselor: <span id="counselor">Insert Here</span></p>
                <p>Appointment Date: <span id="appdate">Insert Here</span></p>
                <p>Appointment Time: <span id="apptime">Insert Here</span></p>
                <p>Nature of Concern: <span id="concern">Insert Here</span></p>
              </td>
            </tr>
            <tr class="tr-std">
              <td class="td-std">
                <p>Student Name: <span id="stdname">Insert Here</span></p>
                <p>Student Email: <span id="stdemail">Insert Here</span></p>
                <p>Student Number: <span id="stdnum">Insert Here</span></p>
                <p>Guidance Counselor: <span id="counselor">Insert Here</span></p>
                <p>Appointment Date: <span id="appdate">Insert Here</span></p>
                <p>Appointment Time: <span id="apptime">Insert Here</span></p>
                <p>Nature of Concern: <span id="concern">Insert Here</span></p>
              </td>
            </tr>
        </tbody>
    </table>
    </div>
    
  
  </div>
</div>

