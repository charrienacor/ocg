<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { LogOutIcon } from "lucide-svelte";
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import * as Dialog from "$lib/components/ui/dialog";
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
  import ScrollAreaScrollbar from "$lib/components/ui/scroll-area/scroll-area-scrollbar.svelte";
  import { Scroll } from "lucide-react";
  export let data: PageServerData;
  let name = data.name;
  let email = data.email;
  let counselors = data.counselor;
  let appointments = data.appointments;
  let timeslots = data.timeslots;

  $: selectedDate = today(getLocalTimeZone());
  $: filterDate = today(getLocalTimeZone()).toString();
  $: filterAppointments = appointments;
  $: day = "";

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

    .box {
      margin-top: 60px;
    }

    @media only screen and (min-width: 735px) {
      .threedots {
        top: 40px;
      }

      .box {
        margin-top: 30px;
      }
    }

    @media only screen and (min-width: 736px) {
      .threedots {
        top: 30px;
      }
    }
  </style>
</head>

<div class="threedots absolute right-4 md:right-10">
  <button
    class="rounded-2xl bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    type="button"
  >
    <a
      href="/api/logout"
      class="text-black hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <LogOutIcon size={25} />
    </a>
  </button>
</div>

<div class="flex w-full flex-col gap-3 lg:flex-row">
  <div class="box w-full rounded bg-white shadow-xl lg:mr-5 lg:w-1/3 lg:p-1">
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
            day = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ][selectedDate.toDate(getLocalTimeZone()).getDay()];
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
      <Dialog.Content class="max-h-screen overflow-y-scroll">
        <Dialog.Header>
          <Dialog.Title>Book an Appointment</Dialog.Title>
          <Dialog.Description
            ><p class="text-red-500">* Required Fields</p></Dialog.Description
          >
        </Dialog.Header>
        <SettingsForm
          data={data.form}
          {name}
          {email}
          {counselors}
          {timeslots}
        />
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
      {#each timeslots as email}
        {#if email.Email === counselor._id}
          <p class="pl-5">
            <b
              >{counselor.First_Name}
              {counselor.Middle_Name}
              {counselor.Last_Name}</b
            >
          </p>
          {#if day === "Monday"}
            {#each email.Monday as time}
              {#if filterAppointments.find((appointment) => appointment.Appointment_Time === time) && filterAppointments.find((appointment) => appointment.Counselor === counselor._id)}
                <p class="pl-10 text-sm">{time} - Unvailable</p>
              {:else}
                <p class="pl-10 text-sm">{time} - Available</p>
              {/if}
            {/each}
          {:else if day === "Tuesday"}
            {#each email.Tuesday as time}
              {#if filterAppointments.find((appointment) => appointment.Appointment_Time === time) && filterAppointments.find((appointment) => appointment.Counselor === counselor._id)}
                <p class="pl-10 text-sm">{time} - Unvailable</p>
              {:else}
                <p class="pl-10 text-sm">{time} - Available</p>
              {/if}
            {/each}
          {:else if day === "Wednesday"}
            {#each email.Wednesday as time}
              {#if filterAppointments.find((appointment) => appointment.Appointment_Time === time) && filterAppointments.find((appointment) => appointment.Counselor === counselor._id)}
                <p class="pl-10 text-sm">{time} - Unvailable</p>
              {:else}
                <p class="pl-10 text-sm">{time} - Available</p>
              {/if}
            {/each}
          {:else if day === "Thursday"}
            {#each email.Thursday as time}
              {#if filterAppointments.find((appointment) => appointment.Appointment_Time === time) && filterAppointments.find((appointment) => appointment.Counselor === counselor._id)}
                <p class="pl-10 text-sm">{time} - Unvailable</p>
              {:else}
                <p class="pl-10 text-sm">{time} - Available</p>
              {/if}
            {/each}
          {:else if day === "Friday"}
            {#each email.Friday as time}
              {#if filterAppointments.find((appointment) => appointment.Appointment_Time === time) && filterAppointments.find((appointment) => appointment.Counselor === counselor._id)}
                <p class="pl-10 text-sm">{time} - Unvailable</p>
              {:else}
                <p class="pl-10 text-sm">{time} - Available</p>
              {/if}
            {/each}
          {:else}
            <p></p>
          {/if}
          <p></p>
        {:else}
          <p></p>
        {/if}
      {/each}
    {/each}
  </div>
</div>
