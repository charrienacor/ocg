<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  import * as Card from "$lib/components/ui/card";
  import { CalendarDays, FileTextIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-svelte";
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

    @media only screen and (min-width: 735px) {
      .threedots {
        top: 112px;
      }
    }

    @media only screen and (min-width: 736px) {
      .threedots {
        top: 30px;
      }
    }
  </style>
</head>

<div class="threedots absolute right-10">
  <button
    class="rounded-full bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    type="button">
    <a href="/api/logout" class="text-black hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
      <LogOutIcon size={25} />
    </a>
  </button>
</div>

<div class="relative">
  <Card.Root class="absolute right-0 w-[400px] ">
    <Card.Header>
      <Card.Title>Book an Appointment</Card.Title>
    </Card.Header>
    <Card.Content>
      <SettingsForm data={data.form} {name} {email} {counselors} />
    </Card.Content>
  </Card.Root>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</div>
