<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { buttonVariants } from "$lib/components/ui/button";
    import { getHoursInDay } from "@internationalized/date";
  import {
    CalendarDays,
    DownloadIcon,
    FileTextIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    PencilIcon,
    ScanSearchIcon,
    SearchIcon,
  } from "lucide-svelte";

  let query: string = "";
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
      background-color: #8e1537;
      color: white;
      padding-bottom: 20px;
    }

    body {
      font-family: Urbanist, sans-serif;
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
<body class="overflow-hidden">
  <div class="threedots absolute right-4 md:right-10">
    <button
      id="dropdownMenuIconButton"
      data-dropdown-toggle="dropdownDots"
      class="inline-flex items-center rounded-full bg-white p-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownMenuIconButton"
      >
        <li>
          <a
            href="/dashboard-admin"
            class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            ><LayoutDashboardIcon size={15} />
            <p class="ml-3">Dashboard</p></a
          >
        </li>
        <li>
          <a
            href="/records-admin"
            class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            ><FileTextIcon size={15} />
            <p class="ml-3">Records</p></a
          >
        </li>
        <li>
          <a
            href="/calendar-admin"
            class="flex items-center px-4 py-2 text-base text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <CalendarDays size={15} />
            <p class="ml-3">Calendar</p></a
          >
        </li>
      </ul>
      <div class="py-2">
        <a
          href="/login-admin"
          class="flex items-center px-4 py-2 text-base text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <LogOutIcon size={15} />
          <p class="ml-3">Log Out</p></a
        >
      </div>
    </div>
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
  </div>

  <h1 class="pb-10 pt-16 sm:pt-5 font-bold">STUDENT RECORDS</h1>

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

  <!-- Temporary Table of Student Records -->
  <!-- To change kasi dapat connected sa sql database ung pagkuha ng values-->
  <div
    class="table-wrp relative block max-h-96 overflow-x-auto rounded-lg border border-none"
  >
    <table
      class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right"
    >
      <thead
        class="sticky top-0 bg-rose-900 text-xs uppercase text-gray-700 text-white dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-5"> Student ID </th>
          <th scope="col" class="px-3 py-5"> First Name </th>
          <th scope="col" class="px-3 py-5"> Middle Name </th>
          <th scope="col" class="px-3 py-5"> Last Name </th>
          <th scope="col" class="px-6 py-5"> Year </th>
          <th scope="col" class="px-6 py-5"> Course </th>
          <th scope="col" class="px-6 py-3"> Action </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00001
          </th>
          <td class="px-6 py-4"> Lester </td>
          <td class="px-6 py-4"> N/A </td>
          <td class="px-6 py-4"> Ignacio </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BS Computer Science </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00002
          </th>
          <td class="px-6 py-4"> John Kenneth </td>
          <td class="px-6 py-4"> E </td>
          <td class="px-6 py-4"> Herrera </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BS Computer Science </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00003
          </th>
          <td class="px-6 py-4"> Gideon Daniel </td>
          <td class="px-6 py-4"> T </td>
          <td class="px-6 py-4"> Orseno </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BS Computer Science </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00004
          </th>
          <td class="px-6 py-4"> Charrie Anne </td>
          <td class="px-6 py-4"> S </td>
          <td class="px-6 py-4"> Nacor </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BS Computer Science </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00005
          </th>
          <td class="px-6 py-4"> Alyanna May </td>
          <td class="px-6 py-4"> Mabutin </td>
          <td class="px-6 py-4"> Lopez </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BS Computer Science </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00006
          </th>
          <td class="px-6 py-4"> Sunoo </td>
          <td class="px-6 py-4"> N/A </td>
          <td class="px-6 py-4"> Kim </td>
          <td class="px-6 py-4"> 2nd Year </td>
          <td class="px-6 py-4"> BA Communication </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00007
          </th>
          <td class="px-6 py-4"> Riki </td>
          <td class="px-6 py-4"> "Niki" </td>
          <td class="px-6 py-4"> Nishimura </td>
          <td class="px-6 py-4"> 1st Year </td>
          <td class="px-6 py-4"> BA Communication </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00008
          </th>
          <td class="px-6 py-4"> Jungwon </td>
          <td class="px-6 py-4"> N/A </td>
          <td class="px-6 py-4"> Yang </td>
          <td class="px-6 py-4"> 2nd Year </td>
          <td class="px-6 py-4"> BA Communication </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00009
          </th>
          <td class="px-6 py-4"> Jaeyun </td>
          <td class="px-6 py-4"> "Jake" </td>
          <td class="px-6 py-4"> Sim </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BA Language and Literature </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00010
          </th>
          <td class="px-6 py-4"> Jongsung </td>
          <td class="px-6 py-4"> "Jay" </td>
          <td class="px-6 py-4"> Park </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BA Language and Literature </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00011
          </th>
          <td class="px-6 py-4"> Sunghoon </td>
          <td class="px-6 py-4"> N/A </td>
          <td class="px-6 py-4"> Park </td>
          <td class="px-6 py-4"> 3rd Year </td>
          <td class="px-6 py-4"> BS Computer Science </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
        <tr
          class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            2021-00012
          </th>
          <td class="px-6 py-4"> Heeseung </td>
          <td class="px-6 py-4"> N/A </td>
          <td class="px-6 py-4"> Lee </td>
          <td class="px-6 py-4"> 4th Year </td>
          <td class="px-6 py-4"> B Social Science </td>
          <td class="flex w-full px-6 py-4">
            <Button
              data-tooltip-target="tooltip-light1"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><DownloadIcon size={20} /></Button
            >
            <div
              id="tooltip-light1"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Download PDF
            </div>
            <Button
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><PencilIcon size={20} /></Button
            >
            <div
              id="tooltip-light2"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              Edit Data
            </div>
            <Button
              data-tooltip-target="tooltip-light3"
              data-tooltip-style="light"
              variant="bigbutton"
              size="icon"
              class="mr-1"
              on:click={() => goto("#")}><ScanSearchIcon size={20} /></Button
            >
            <div
              id="tooltip-light3"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm"
            >
              View Data
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
