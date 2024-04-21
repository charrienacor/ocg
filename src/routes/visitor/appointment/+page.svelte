<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button/index.js";
  import { CircleArrowLeftIcon, CircleArrowRightIcon, LogOutIcon } from "lucide-svelte";
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
    class="rounded-full bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    type="button">
    <a href="/api/logout" class="text-black hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
      <LogOutIcon size={25} />
    </a>
  </button>
</div>

<div class="w-full flex flex-col sm:flex-row gap-3 ">
<div class="box bg-white p-1 mr-5 w-full sm:w-1/3 rounded shadow-md">
  <h1 class="p-4 text-xl text-bold">Hello!</h1>
  <p class="pt-0.5 pr-4 pl-4">Here you can schedule an appointment for consultation in the OCG. To book an appointment:</p>
    <br>
  <p class="pt-0.5 pr-4 pl-4"><b>Step 1:</b> Click on a specific day to see the available time and counselor.</p>
    <br>
  <p class="pt-0.5 pr-4 pl-4"><b>Step 2:</b> Click on the "Book an appointment" button to schedule an appointment.</p>
    <br>
  <p class="pt-0.5 pr-4 pl-4"><b>Step 3:</b> Submit the request form. </p>
    <br>
  <p class="pt-0.5 pr-4 pl-4 pb-4"><b>Step 4:</b> Wait for an email updating you on the status (accepted/rejected) of your appointment.</p>
</div>

<div class="box">
   <div class="bg-white p-2 rounded shadow-xl">
    <Calendar></Calendar>
  </div> 

<button 
  id="dropdown"
  data-dropdown-toggle="dropdownDots"
  type="button">
    <Button class="book relative w-[290px] top-10 text-wrap text-xl">Book an Appointment</Button>
</button>

<div id="dropdownDots" class="relative hidden">
  <Card.Root class="absolute right-0 top-5 w-[400px] ">
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
</div>
