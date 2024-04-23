<script lang="ts">
    import {
      CalendarDays,
      FileTextIcon,
      LayoutDashboardIcon,
      SearchIcon,
      UserIcon,
      LogOutIcon,
    } from "lucide-svelte";

    import * as Form from "$lib/components/ui/form";
    import { superForm } from "sveltekit-superforms";
    import { formSchema } from "./schema";
    import { zodClient } from "sveltekit-superforms/adapters";
    import * as Select from "$lib/components/ui/select/index.js";

    export let data: any;

    const form = superForm(data, {
        validators: zodClient(formSchema),
    });

    const { form: formData, enhance } = form;

    const status = [
        { value: "active", label: "Active" },
        { value: "deactivated", label: "Deactivated" },
        { value: "on_leave", label: "On Leave" },
    ];
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
  
  <h1 class="pb-5 pt-12 font-bold sm:pt-5">ADMIN ACCOUNTS</h1>
    <form class="mx-auto w-full">
      <label for="default-search" class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
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
          >Search</button>
      </div>
    </form>
  
    <!-- Temporary Table of Student Records -->
    <!-- To change kasi dapat connected sa sql database ung pagkuha ng values-->
    <form method="POST" use:enhance>
    <div class="table-wrp relative block max-h-96 overflow-x-auto rounded-lg border border-none">  
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead class="sticky top-0 bg-rose-900 text-xs uppercase text-gray-700 text-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-5"> Counselor ID/Email </th>
            <th scope="col" class="px-3 py-5"> First Name </th>
            <th scope="col" class="px-3 py-5"> Middle Name </th>
            <th scope="col" class="px-3 py-5"> Last Name </th>
            <th scope="col" class="px-6 py-5"> Suffix </th>
            <th scope="col" class="px-6 py-5 w-1/4"> Status </th>
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
              sunoo@gmail.com
            </th>
            <td class="px-6 py-4"> Sunoo </td>
            <td class="px-6 py-4"> N/A </td>
            <td class="px-6 py-4"> Kim </td>
            <td class="px-6 py-4"> N/A  </td>
            <td class="px-6 py-4"> 
                <Form.Field {form} name="Status">
                    <Form.Control let:attrs>
                      <Select.Root>
                        <Select.Trigger>
                          <Select.Value/>
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Group>
                            {#each status as status}
                              <Select.Item value={status.value} label={status.label}
                                >{status.label}</Select.Item
                              >
                            {/each}
                          </Select.Group>
                        </Select.Content>
                        <Select.Input name="status" />
                      </Select.Root>
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>    
            </td>
          </tr>
          <tr
            class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              niki@gmail.com
            </th>
            <td class="px-6 py-4"> Riki </td>
            <td class="px-6 py-4"> "Niki" </td>
            <td class="px-6 py-4"> Nishimura </td>
            <td class="px-6 py-4"> N/A  </td>
            <td class="px-6 py-4"> 
                <Form.Field {form} name="Status">
                    <Form.Control let:attrs>
                      <Select.Root>
                        <Select.Trigger>
                          <Select.Value/>
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Group>
                            {#each status as status}
                              <Select.Item value={status.value} label={status.label}
                                >{status.label}</Select.Item
                              >
                            {/each}
                          </Select.Group>
                        </Select.Content>
                        <Select.Input name="status" />
                      </Select.Root>
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>        
            </td>
          </tr>
          <tr
            class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              jungwon@gmail.com
            </th>
            <td class="px-6 py-4"> Jungwon </td>
            <td class="px-6 py-4"> N/A </td>
            <td class="px-6 py-4"> Yang </td>
            <td class="px-6 py-4"> N/A  </td>
            <td class="px-6 py-4"> 
                <Form.Field {form} name="Status">
                    <Form.Control let:attrs>
                      <Select.Root>
                        <Select.Trigger>
                          <Select.Value/>
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Group>
                            {#each status as status}
                              <Select.Item value={status.value} label={status.label}
                                >{status.label}</Select.Item
                              >
                            {/each}
                          </Select.Group>
                        </Select.Content>
                        <Select.Input name="status" />
                      </Select.Root>
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>    
            </td>
          </tr>
          <tr
            class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              jake@gmail.com
            </th>
            <td class="px-6 py-4"> Jaeyun </td>
            <td class="px-6 py-4"> "Jake" </td>
            <td class="px-6 py-4"> Sim </td>
            <td class="px-6 py-4"> N/A  </td>
            <td class="px-6 py-4">
                <Form.Field {form} name="Status">
                    <Form.Control let:attrs>
                      <Select.Root>
                        <Select.Trigger>
                          <Select.Value/>
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Group>
                            {#each status as status}
                              <Select.Item value={status.value} label={status.label}
                                >{status.label}</Select.Item
                              >
                            {/each}
                          </Select.Group>
                        </Select.Content>
                        <Select.Input name="status" />
                      </Select.Root>
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>    
            </td>
          </tr>
          <tr
            class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
             jay@gmail.com
            </th>
            <td class="px-6 py-4"> Jongsung </td>
            <td class="px-6 py-4"> "Jay" </td>
            <td class="px-6 py-4"> Park </td>
            <td class="px-6 py-4"> N/A </td>
            <td class="px-6 py-4">
                <Form.Field {form} name="Status">
                    <Form.Control let:attrs>
                      <Select.Root>
                        <Select.Trigger>
                          <Select.Value/>
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Group>
                            {#each status as status}
                              <Select.Item value={status.value} label={status.label}
                                >{status.label}</Select.Item
                              >
                            {/each}
                          </Select.Group>
                        </Select.Content>
                        <Select.Input name="status" />
                      </Select.Root>
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>    
            </td>
          </tr>
          <tr
            class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              sunghoon@gmail.com
            </th>
            <td class="px-6 py-4"> Sunghoon </td>
            <td class="px-6 py-4"> N/A </td>
            <td class="px-6 py-4"> Park </td>
            <td class="px-6 py-4"> N/A </td>
            <td class="px-6 py-4">
                <Form.Field {form} name="Status">
                    <Form.Control let:attrs>
                      <Select.Root>
                        <Select.Trigger>
                          <Select.Value/>
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Group>
                            {#each status as status}
                              <Select.Item value={status.value} label={status.label}
                                >{status.label}</Select.Item
                              >
                            {/each}
                          </Select.Group>
                        </Select.Content>
                        <Select.Input name="status" />
                      </Select.Root>
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>    
            </td>
          </tr>
          <tr
            class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              heeseung@gmail.com
            </th>
            <td class="px-6 py-4"> Heeseung </td>
            <td class="px-6 py-4"> N/A </td>
            <td class="px-6 py-4"> Lee </td>
            <td class="px-6 py-4"> N/A </td>
            <td class="px-6 py-4"><Form.Field {form} name="Status">
                <Form.Control let:attrs>
                  <Select.Root>
                    <Select.Trigger>
                      <Select.Value/>
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        {#each status as status}
                          <Select.Item value={status.value} label={status.label}
                            >{status.label}</Select.Item
                          >
                        {/each}
                      </Select.Group>
                    </Select.Content>
                    <Select.Input name="status" />
                  </Select.Root>
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>    
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  <Form.Button class="w-full mt-7">UPDATE</Form.Button>
  </form>