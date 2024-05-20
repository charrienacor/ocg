<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    LogOutIcon,
  } from "lucide-svelte";
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import * as Dialog from "$lib/components/ui/dialog";
  export let data: PageServerData;
  let name = data.name;
  let email = data.email;
  let counselors = data.counselor;
  let colleges = data.college;
  let appointments = data.appointments;

  $: selectedDate = today(getLocalTimeZone());
  $: filterDate = "";
  $: filterAppointments = appointments;
  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });
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

<div class="mt-7 flex w-full flex-col gap-3 sm:mt-14 md:mt-7 lg:flex-row">
  <div
    class="box mb-5 w-full rounded bg-white shadow-xl lg:mr-5 lg:w-1/3 lg:p-1"
  >
    <h1 class="p-4 text-center text-xl">WELCOME!</h1>
    <p class="px-4 pt-0.5">
      Here you can schedule an appointment for consultation in the OCG. To book
      an appointment:
    </p>
    <br />
    <p class="px-4 pt-0.5">
      <b>Step 1:</b> Click on a specific day to see the available time and counselor.
    </p>
    <br />
    <p class="px-4 pt-0.5">
      <b>Step 2:</b> Click on the "Book an appointment" button to schedule an appointment.
    </p>
    <br />
    <p class="px-4 pt-0.5"><b>Step 3:</b> Submit the request form.</p>
    <br />
    <p class="px-4 pb-4 pt-0.5">
      <b>Step 4:</b> Wait for an email updating you on the status (accepted/rejected)
      of your appointment.
    </p>
  </div>

  <div class="box flex flex-col items-center gap-10">
    <div class="w-[290px] rounded bg-white p-2 shadow-xl">
      <Calendar
        minValue={today(getLocalTimeZone())}
        calendarLabel="Appointment Date"
        initialFocus
        onValueChange={(v) => {
          if (v) {
            selectedDate = v;
            filterDate = v.toString();
            filterAppointments = appointments.filter(
              (e) => e.Appointment_Date === filterDate,
            );
          } else {
            console.log(v);
          }
        }}
      />
    </div>

    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="long">
          <p class="text-lg">Book an Appointment</p>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Book an Appointment</Dialog.Title>
        </Dialog.Header>
        <SettingsForm data={data.form} {name} {email} {counselors} {colleges} />
      </Dialog.Content>
    </Dialog.Root>
  </div>

  <div class="box w-full rounded bg-white shadow-xl lg:ml-5 lg:w-1/3 lg:p-1">
    <h1 class="p-4 text-left text-xl lg:text-center">
      Counselor Schedules for<br />
      {df.format(selectedDate.toDate(getLocalTimeZone()))}
    </h1>
    <hr class="mx-4 h-3" />
    {#each counselors as counselor}
      <p class="pl-5">
        <b
          >{counselor.First_Name}
          {counselor.Middle_Name}
          {counselor.Last_Name}</b
        >
        {#each filterAppointments as appointment}
          {#if counselor._id === appointment.Counselor}
            <p class="pl-10 text-sm">
              {appointment.Appointment_Time} - Unavailable
            </p>
          {/if}
        {/each}
      </p>
    {/each}
  </div>
</div>
