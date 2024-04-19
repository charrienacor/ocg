<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import {
      CalendarDays,
      DownloadIcon,
      FileTextIcon,
      LayoutDashboardIcon,
      LogOutIcon,
      PencilIcon,
    } from "lucide-svelte";

    import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { superForm } from "sveltekit-superforms";
  
  import { formSchema } from "./schema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value: DateValue | undefined = undefined;

  export let data: any;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;

  const semester = [
    { value: "first", label: "First Semester" },
    { value: "second", label: "Second Semester" },
    { value: "midyear", label: "Midyear" },
  ];

  $: selectedSem = $formData.Sem
    ? {
        label: $formData.SemLabel,
        value: $formData.Sem,
      }
    : undefined;

    const course = [
    { value: "ba_comm", label: "Bachelor of Arts in Communication" },
    { value: "cert_fa", label: "Certificate in Fine Arts" },
    { value: "bfa", label: "Bachelor of Fine Arts" },
    { value: "ba_ll", label: "Bachelor of Arts in Language and Literature" },
    { value: "ma_ll", label: "Master of Arts in Language and Literature" },
    { value: "bs_bio", label: "Bachelor of Science in Biology" },
    { value: "bs_cmsc", label: "Bachelor of Science in Computer Science" },
    { value: "bs_math", label: "Bachelor of Science in Mathematics" },
    { value: "bs_phys", label: "Bachelor of Science in Physics" },
    {
      value: "ms_cre",
      label: "Master of Science in Conservation and Restoration Ecology",
    },
    { value: "ms_math", label: "Master of Science in Mathematics" },
    { value: "phd_math", label: "Ph.D. in Mathematics" },
    { value: "ba_ss", label: "Bachelor of Arts in Social Sciences" },
    { value: "bs_me", label: "Bachelor of Science in Management Economics" },
    { value: "mm", label: "Master of Management" },
    {
      value: "ma_sds",
      label: "Master of Arts in Social and Development Studies",
    },
  ];

  const status = [
    { value: "graduate", label: "Graduate" },
    { value: "enrolled", label: "Enrolled" },
    { value: "transfer_in", label: "Transferred-In" },
    { value: "transfer_out", label: "Transferred-Out" },
    { value: "readmitted", label: "Readmitted" },
    { value: "loa", label: "On Leave of Absence" },
    { value: "exit", label: "Exit" },
  ];

  const college = [
    { value: "cac", label: "College of Arts and Communication" },
    { value: "cs", label: "College of Science" },
    { value: "css", label: "College of Social Sciences" },
  ];

  const sex = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ];

  // add more options
  const nationality = [
    { value: "Filipino", label: "Filipino" },
    { value: "American", label: "American" },
    { value: "Australian", label: "Australian" },
    { value: "Canadian", label: "Canadian" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
  ];

  //add more options
  const citizenship = [
    { value: "Filipino", label: "Filipino" },
    { value: "American", label: "American" },
    { value: "Australian", label: "Australian" },
    { value: "Canadian", label: "Canadian" },
    { value: "Japanese", label: "Japanese" },
  ];

  //add more options
  const religion = [
    { value: "Buddhism", label: "Buddhism" },
    { value: "Judaism", label: "Judaism" },
    { value: "Hinduism", label: "Hinduism" },
    { value: "Islam", label: "Islam" },
    { value: "Catholic", label: "Catholic" },
    { value: "Iglesia ni Cristo", label: "Iglesia ni Cristo" },
    {
      value: "Philippine Independent Church",
      label: "Philippine Independent Church",
    },
  ];

  const life_status = [
    { value: "living", label: "Living" },
    { value: "deceased", label: "Deceased" },
  ];

  const education = [
    { value: "elem", label: "Elementary Graduate" },
    { value: "hs", label: "High School Graduate" },
    { value: "college", label: "College Graduate" },
    { value: "ma", label: "Master's Graduate" },
    { value: "phd", label: "Doctorate's Graduate" },
    { value: "voc", label: "Vocational" },
  ];

  const numberstud = [
    { value: "less than 25", label: "Less than 25" },
    { value: "25-99", label: "25-99" },
    { value: "100-199", label: "100-199" },
    { value: "200-399", label: "200-399" },
    { value: "400-599", label: "400-599" },
    { value: "600 or more", label: "600 or more" },
  ];

  const HSrank = [
    { value: "upper 25%", label: "Upper 25%" },
    { value: "average", label: "Average" },
    { value: "lower 25%", label: "Lower 25%" },
  ];

  const SchoolAve = [
    { value: "95-100", label: "95-100" },
    { value: "90-94", label: "90-94" },
    { value: "85-89", label: "85-89" },
    { value: "80-84", label: "80-84" },
    { value: "75-79", label: "75-79" },
  ];

  const honors = [
    { value: "valedictorian", label: "Valedictorian" },
    { value: "salutatorian", label: "Salutatorian" },
    { value: "honorable mention", label: "Honorable Mention" },
  ];

  const campus = [
    { value: "upd", label: "UP Diliman" },
    { value: "uplb", label: "UP Los Banos" },
    { value: "upb", label: "UP Baguio" },
    { value: "upou", label: "UP Open University" },
    { value: "upv", label: "UP Visayas" },
    { value: "upc", label: "UP Cebu" },
    { value: "upt", label: "UP Tacloban" },
    { value: "upm", label: "UP Mindanao" },
  ];

  const income = [
    { value: "less than 10,000", label: "less than 10,000" },
    { value: "10,001 - 20,000", label: "10,001 - 20,000" },
    { value: "20,001 - 30,000", label: "20,001 - 30,000" },
    { value: "30,001 - 40,000", label: "30,001 - 40,000" },
    { value: "40,001 - 45,000", label: "40,001 - 45,000" },
    { value: "45,001 - 50,000", label: "45,001 - 50,000" },
    { value: "50,001 - 55,000", label: "50,001 - 55,000" },
    { value: "55,001 - 60,000", label: "55,001 - 60,000" },
    { value: "60,000 - above", label: "60,000 - above" },
  ];

  const major = [
    { value: "none", label: "N/A" },
    { value: "Economics", label: "Economics" },
    { value: "History", label: "History" },
    { value: "Anthropology", label: "Anthropology" },
  ];

  const YN = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const Cstatus = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "widowed", label: "Widowed" },
    { value: "separated", label: "Separated" },
    { value: "divorced", label: "Divorced" },
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
      class="-right-14 z-10 hidden divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
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
  
  <div class="relative mb-10 mt-5">
    <div class="flow-root">
      <h1 class="float-left font-bold sm:pt-5">RECORDS OF [STUDENT'S FIRST NAME]</h1>
      <div class="float-right flex pt-8">
        <Button
          data-tooltip-target="tooltip-light1"
          data-tooltip-style="light"
          variant="bigbutton"
          size="icon"
          class="mr-1"
          on:click={() => goto("#")}><DownloadIcon size={20} /></Button>
        <div
          id="tooltip-light1"
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm">
          Download PDF
        </div>
        <Button
          data-tooltip-target="tooltip-light2"
          data-tooltip-style="light"
          variant="bigbutton"
          size="icon"
          class="mr-1"
          on:click={() => goto("/admin/records/edit")}><PencilIcon size={20} /></Button>
        <div
          id="tooltip-light2"
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-900 opacity-0 shadow-sm">
          Edit Data
        </div>
      </div>
    </div>
    <form method="POST" use:enhance>
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>UPCAT Grades</h1>
  
        <div class="md:grid md:grid-cols-6 md:gap-3">
          <Form.Field {form} name="Sci">
            <Form.Control let:attrs>
              <Form.Label><p style="line-height: 42px; text-align: center;">Science</p></Form.Label>
              <Input
                {...attrs}
                placeholder="XXX"
                bind:value={$formData.Sci}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Math">
            <Form.Control let:attrs>
              <Form.Label><p style="line-height: 42px; text-align: center;">Mathematics</p></Form.Label>
              <Input
                {...attrs}
                placeholder="XXX"
                bind:value={$formData.Math}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Read_Comp">
            <Form.Control let:attrs>
              <Form.Label><p style="text-align: center;">Reading Comprehension</p></Form.Label>
              <Input
                {...attrs}
                placeholder="XXX"
                bind:value={$formData.Read_Comp}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Lang_Prof">
            <Form.Control let:attrs>
                <Form.Label><p style="line-height: 42px; text-align: center;">Language Proficiency</p></Form.Label>
                <Input
                  {...attrs}
                  placeholder="XXX"
                  bind:value={$formData.Lang_Prof}
                />
              </Form.Control>
          </Form.Field>

          <Form.Field {form} name="X">
            <Form.Control let:attrs>
              <Form.Label><p style="line-height: 42px; text-align: center;">Abstract Reasoning</p></Form.Label>
              <Input
                {...attrs}
                placeholder="XXX"
                bind:value={$formData.X}
              />
            </Form.Control>
          </Form.Field>
  
          <Form.Field {form} name="UPG">
            <Form.Control let:attrs>
              <Form.Label><p style="line-height: 42px; text-align: center;">Total UP Grade</p></Form.Label>
              <Input
                {...attrs}
                placeholder="XXX"
                bind:value={$formData.UPG}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>


      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Preliminaries</h1>
  
        <div class="md:grid md:grid-cols-2 md:gap-4">
          <Form.Field {form} name="Semester">
            <Form.Control let:attrs>
              <Form.Label>Semester</Form.Label>
              <Select.Root
              selected={selectedSem}
              onSelectedChange={(v) => {
              v && ($formData.Sem = v.value) && ($formData.SemLabel = v.label);
          }}>
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select a semester." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each semester as semester}
                      <Select.Item value={semester.value} label={semester.label}
                        >{semester.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input hidden bind:value={$formData.Sem} name = {attrs.name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="School_Year">
            <Form.Control let:attrs>
              <Form.Label>School Year</Form.Label>
              <Input
                {...attrs}
                placeholder="20XX-20XX"
                bind:value={$formData.School_Year}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Student_Number">
            <Form.Control let:attrs>
              <Form.Label>Student Number</Form.Label>
              <Input
                {...attrs}
                placeholder="20XXXXXXX"
                bind:value={$formData.Student_Number}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Degree_Program">
            <Form.Control let:attrs>
              <Form.Label>Course/Degree Program</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select a course/degree program." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each course as course}
                      <Select.Item value={course.value} label={course.label}
                        >{course.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="degprog" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Academic Status">
            <Form.Control let:attrs>
              <Form.Label>Academic Status</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select a status." />
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
  
          <Form.Field {form} name="College">
            <Form.Control let:attrs>
              <Form.Label>College</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select a course/degree program." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each college as college}
                      <Select.Item value={college.value} label={college.label}
                        >{college.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="college" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>
  
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Personal Information</h1>
        <p class="mb-4">
          <b>TO THE STUDENT:</b> The purpose of this form is to bring together all
          essential information that may enable us to help you meet your specific needs
          & future plans. The information will be kept confidential. Please answer
          CAREFULLY, COMPLETELY & SINCERELY.
        </p>
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Student_Name">
            <Form.Control let:attrs>
              <Form.Label>Name</Form.Label>
              <Input
                {...attrs}
                placeholder="Surname, First Name, Middle Name"
                bind:value={$formData.Student_Name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Nickname">
            <Form.Control let:attrs>
              <Form.Label>Nickname</Form.Label>
              <Input
                {...attrs}
                placeholder="Nickname"
                bind:value={$formData.Nickname}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Sex">
            <Form.Control let:attrs>
              <Form.Label>Sex</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your sex."/>
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each sex as sex}
                      <Select.Item value={sex.value} label={sex.label}
                        >{sex.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Sex" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="Age"
                bind:value={$formData.Age}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Birth_Date">
            <Form.Control let:attrs>
              <Form.Label>Date of Birth<br /></Form.Label>
              <Popover.Root>
                <Popover.Trigger asChild let:builder>
                  <Button
                    variant="outline"
                    class={cn(
                      "w-full justify-start text-left font-normal",
                      !value && "text-muted-foreground",
                    )}
                    builders={[builder]}
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {value
                      ? df.format(value.toDate(getLocalTimeZone()))
                      : "Select your birth date"}
                  </Button>
                </Popover.Trigger>
                <Popover.Content class="w-auto p-0" align="start">
                  <Calendar bind:value />
                </Popover.Content>
              </Popover.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Place_Of_Birth">
            <Form.Control let:attrs>
              <Form.Label>Place of Birth</Form.Label>
              <Input
                {...attrs}
                placeholder="Place of Birth"
                bind:value={$formData.Place_Of_Birth}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <div class="gap-4 md:grid md:grid-cols-3">
          <Form.Field {form} name="Nationality">
            <Form.Control let:attrs>
              <Form.Label>Nationality</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your nationality." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each nationality as nationality}
                      <Select.Item
                        value={nationality.value}
                        label={nationality.label}>{nationality.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Nationality" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Citizenship">
            <Form.Control let:attrs>
              <Form.Label>Citizenship</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your citizenship." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each citizenship as citizenship}
                      <Select.Item
                        value={citizenship.value}
                        label={citizenship.label}>{citizenship.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Citizenship" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Religion">
            <Form.Control let:attrs>
              <Form.Label>Religion</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your religion." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each religion as religion}
                      <Select.Item value={religion.value} label={religion.label}
                        >{religion.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Religion" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Cellphone_Number">
            <Form.Control let:attrs>
              <Form.Label>Cellphone Number</Form.Label>
              <Input
                {...attrs}
                placeholder="09XXXXXXXXX"
                bind:value={$formData.Cellphone_Number}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Email_Address">
            <Form.Control let:attrs>
              <Form.Label>Email Address</Form.Label>
              <Input
                {...attrs}
                placeholder="Email Address"
                bind:value={$formData.Email_Address}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Baguio_Address">
            <Form.Control let:attrs>
              <Form.Label>Address While In UP Baguio</Form.Label>
              <Input
                {...attrs}
                placeholder="Baguio Address"
                bind:value={$formData.Baguio_Address}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Baguio_Telephone_Number">
            <Form.Control let:attrs>
              <Form.Label>Telephone Number</Form.Label>
              <Input
                {...attrs}
                placeholder="Telephone Number of Baguio Residence"
                bind:value={$formData.Baguio_Telephone_Number}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Permanent_Address">
            <Form.Control let:attrs>
              <Form.Label>Permanent Home Address</Form.Label>
              <Input
                {...attrs}
                placeholder="Permanent Home Address"
                bind:value={$formData.Permanent_Address}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Permanent_Telephone_Number">
            <Form.Control let:attrs>
              <Form.Label>Telephone Number</Form.Label>
              <Input
                {...attrs}
                placeholder="Telephone Number of Permanent Residence"
                bind:value={$formData.Permanent_Telephone_Number}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>
  
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Family Data</h1>
  
        <Form.Field {form} name="Parent_Status">
          <Form.Control let:attrs>
            <Form.Label
              >Check any of the following that is applicable.(Checkbox)</Form.Label
            >
            <div class="gap-4 md:grid md:grid-cols-4">
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Parents still married</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Parents Separated</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Father re-married</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Mother re-married</label
                >
              </div>
            </div>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <Form.Field {form} name="Guardian">
          <Form.Control let:attrs>
            <Form.Label>Guardian (If not living with parents)</Form.Label>
            <Input
              {...attrs}
              placeholder="Name of your Guardian"
              bind:value={$formData.Guardian}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Guardian_Address">
            <Form.Control let:attrs>
              <Form.Label>Address</Form.Label>
              <Input
                {...attrs}
                placeholder="Address"
                bind:value={$formData.Address}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Guardian_Telephone_Number">
            <Form.Control let:attrs>
              <Form.Label>Telephone Number</Form.Label>
              <Input
                {...attrs}
                placeholder="09XXXXXXXXX"
                bind:value={$formData.Telephone_Number}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <hr />
        <div class="grid grid-cols-2 gap-4">
          <div
            class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
          >
            FATHER
          </div>
          <div
            class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
          >
            MOTHER
          </div>
          <div>
            <Form.Field {form} name="Father_Name">
              <Form.Control let:attrs>
                <Form.Label>Name</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Name of Father"
                  bind:value={$formData.Father_Name}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Age">
                <Form.Control let:attrs>
                  <Form.Label>Age</Form.Label>
                  <Input
                    {...attrs}
                    placeholder="Age"
                    bind:value={$formData.Age}
                  />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Living_Or_Dead">
              <Form.Control let:attrs>
                <Form.Label>Living or Deceased</Form.Label>
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select a status." />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      {#each life_status as life_status}
                        <Select.Item
                          value={life_status.value}
                          label={life_status.label}
                          >{life_status.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="Living_Or_Dead" />
                </Select.Root>
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Place_Of_Birth">
              <Form.Control let:attrs>
                <Form.Label>Birthplace</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Birthplace"
                  bind:value={$formData.Place_Of_Birth}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Address">
              <Form.Control let:attrs>
                <Form.Label>Address</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Address"
                  bind:value={$formData.Address}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Contact_Number">
              <Form.Control let:attrs>
                <Form.Label>Contact Number</Form.Label>
                <Input
                  {...attrs}
                  placeholder="09XXXXXXXXX"
                  bind:value={$formData.Contact_Number}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Religion">
              <Form.Control let:attrs>
                <Form.Label>Religion</Form.Label>
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select your religion." />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      {#each religion as religion}
                        <Select.Item value={religion.value} label={religion.label}
                          >{religion.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="Religion" />
                </Select.Root>
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Occupation">
              <Form.Control let:attrs>
                <Form.Label>Occupation</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Occupation"
                  bind:value={$formData.Occupation}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Monthly_Income">
              <Form.Control let:attrs>
                <Form.Label>Monthly Income</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Monthly Income"
                  bind:value={$formData.Monthly_Income}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Employer_Name">
              <Form.Control let:attrs>
                <Form.Label>Name of Employer</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Name of Employer"
                  bind:value={$formData.Employer_Name}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Employer_Address">
              <Form.Control let:attrs>
                <Form.Label>Address of Employer</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Address of Employer"
                  bind:value={$formData.Employer_Address}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_Highest_Degree_Completed">
              <Form.Control let:attrs>
                <Form.Label>Highest Grade/Degree Completed</Form.Label>
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select an option." />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      {#each education as education}
                        <Select.Item
                          value={education.value}
                          label={education.label}>{education.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="Highest_Degree_Completed" />
                </Select.Root>
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Father_School">
              <Form.Control let:attrs>
                <Form.Label>School or College</Form.Label>
                <Input
                  {...attrs}
                  placeholder="School or College"
                  bind:value={$formData.School}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <!-- pwedeng drop down but multiple languages/dialects could be selected -->
            <Form.Field {form} name="Father_Languages">
              <Form.Control let:attrs>
                <Form.Label>Dialects/Languages spoken at home</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Dialects (ex. Bisaya, Ilocano) or Languages (ex. Filipino, English)"
                  bind:value={$formData.Languages}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
          </div>
          <div>
            <Form.Field {form} name="Mother_Name">
              <Form.Control let:attrs>
                <Form.Label>Name</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Name of Mother"
                  bind:value={$formData.Mother_Name}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Age">
              <Form.Control let:attrs>
                <Form.Label>Age</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Age"
                  bind:value={$formData.Age}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Living_Or_Dead">
              <Form.Control let:attrs>
                <Form.Label>Living or Deceased</Form.Label>
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select a status." />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      {#each life_status as life_status}
                        <Select.Item
                          value={life_status.value}
                          label={life_status.label}
                          >{life_status.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="Living_Or_Dead" />
                </Select.Root>
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Place_Of_Birth">
              <Form.Control let:attrs>
                <Form.Label>Birthplace</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Birthplace"
                  bind:value={$formData.Place_Of_Birth}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Address">
              <Form.Control let:attrs>
                <Form.Label>Address</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Address"
                  bind:value={$formData.Address}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Contact_Number">
              <Form.Control let:attrs>
                <Form.Label>Contact Number</Form.Label>
                <Input
                  {...attrs}
                  placeholder="09XXXXXXXXX"
                  bind:value={$formData.Contact_Number}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Religion">
              <Form.Control let:attrs>
                <Form.Label>Religion</Form.Label>
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select your religion." />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      {#each religion as religion}
                        <Select.Item value={religion.value} label={religion.label}
                          >{religion.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="Religion" />
                </Select.Root>
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Occupation">
              <Form.Control let:attrs>
                <Form.Label>Occupation</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Occupation"
                  bind:value={$formData.Occupation}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Monthly_Income">
              <Form.Control let:attrs>
                <Form.Label>Monthly Income</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Monthly Income"
                  bind:value={$formData.Monthly_Income}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Employer_Name">
              <Form.Control let:attrs>
                <Form.Label>Name of Employer</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Name of Employer"
                  bind:value={$formData.Employer_Name}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Employer_Address">
              <Form.Control let:attrs>
                <Form.Label>Address of Employer</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Address of Employer"
                  bind:value={$formData.Employer_Address}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_Highest_Degree_Completed">
              <Form.Control let:attrs>
                <Form.Label>Highest Grade/Degree Completed</Form.Label>
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select an option." />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      {#each education as education}
                        <Select.Item
                          value={education.value}
                          label={education.label}>{education.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="Highest_Degree_Completed" />
                </Select.Root>
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <Form.Field {form} name="Mother_School">
              <Form.Control let:attrs>
                <Form.Label>School or College</Form.Label>
                <Input
                  {...attrs}
                  placeholder="School or College"
                  bind:value={$formData.School}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
  
            <!-- pwedeng drop down but multiple languages/dialects could be selected -->
            <Form.Field {form} name="Mother_Languages">
              <Form.Control let:attrs>
                <Form.Label>Dialects/Languages spoken at home</Form.Label>
                <Input
                  {...attrs}
                  placeholder="Dialects (ex. Bisaya, Ilocano) or Languages (ex. Filipino, English)"
                  bind:value={$formData.Languages}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
          </div>
        </div>
      </div>
  
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Children in the Family</h1>
        <div class="gap-2 md:grid md:grid-cols-7">
          <div
            class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
          >
            NAME
          </div>
          <div
            class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
          >
            SEX
          </div>
          <div
            class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
          >
            AGE
          </div>
          <div
            class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
          >
            CIVIL STATUS
          </div>
          <div
            class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
          >
            EDUCATIONAL ATTAINMENT
          </div>
          <div
            class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
          >
            OCCUPATION
          </div>
          <div
            class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
          >
            RESIDENCE
          </div>
  
          <Form.Field {form} name="Name">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="Name" bind:value={$formData.Name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Sex">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each sex as sex}
                      <Select.Item value={sex.value} label={sex.label}
                        >{sex.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Sex" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="Age"
                bind:value={$formData.Age}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Civil_Status">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each Cstatus as Cstatus}
                      <Select.Item value={Cstatus.value} label={Cstatus.label}
                        >{Cstatus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Civil_Status" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Educational_Attainment">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each education as education}
                      <Select.Item value={education.value} label={education.label}
                        >{education.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Educational_Attainment" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Occupation">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Residence">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Residence"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Name">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="Name" bind:value={$formData.Name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Sex">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each sex as sex}
                      <Select.Item value={sex.value} label={sex.label}
                        >{sex.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Sex" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="Age"
                bind:value={$formData.Age}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Civil_Status">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each Cstatus as Cstatus}
                      <Select.Item value={Cstatus.value} label={Cstatus.label}
                        >{Cstatus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Civil_Status" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Educational_Attainment">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each education as education}
                      <Select.Item value={education.value} label={education.label}
                        >{education.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Educational_Attainment" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Occupation">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Residence">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Residence"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field {form} name="Name">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="Name" bind:value={$formData.Name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Sex">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each sex as sex}
                      <Select.Item value={sex.value} label={sex.label}
                        >{sex.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Sex" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="Age"
                bind:value={$formData.Age}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Civil_Status">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each Cstatus as Cstatus}
                      <Select.Item value={Cstatus.value} label={Cstatus.label}
                        >{Cstatus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Civil_Status" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Educational_Attainment">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each education as education}
                      <Select.Item value={education.value} label={education.label}
                        >{education.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Educational_Attainment" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Occupation">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Residence">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Residence"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Name">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="Name" bind:value={$formData.Name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Sex">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each sex as sex}
                      <Select.Item value={sex.value} label={sex.label}
                        >{sex.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Sex" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="Age"
                bind:value={$formData.Age}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Civil_Status">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each Cstatus as Cstatus}
                      <Select.Item value={Cstatus.value} label={Cstatus.label}
                        >{Cstatus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Civil_Status" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Educational_Attainment">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each education as education}
                      <Select.Item value={education.value} label={education.label}
                        >{education.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Educational_Attainment" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Occupation">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Residence">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Residence"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Name">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="Name" bind:value={$formData.Name} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Sex">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each sex as sex}
                      <Select.Item value={sex.value} label={sex.label}
                        >{sex.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Sex" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="Age"
                bind:value={$formData.Age}
              />
            </Form.Control>
            <Form.FieldErrors />
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Civil_Status">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each Cstatus as Cstatus}
                      <Select.Item value={Cstatus.value} label={Cstatus.label}
                        >{Cstatus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Civil_Status" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Educational_Attainment">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each education as education}
                      <Select.Item value={education.value} label={education.label}
                        >{education.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Educational_Attainment" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Occupation">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Residence">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Residence"
                bind:value={$formData.Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>
  
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Educational Background</h1>
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Elementary_School">
            <Form.Control let:attrs>
              <Form.Label>Elementary School</Form.Label>
              <Input
                {...attrs}
                placeholder="Name of School"
                bind:value={$formData.Elementary_School}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Elementary_School_Location">
            <Form.Control let:attrs>
              <Form.Label>Location</Form.Label>
              <Input
                {...attrs}
                placeholder="Location of Elementary School"
                bind:value={$formData.Elementary_School_Location}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <hr />
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Junior_High_School">
            <Form.Control let:attrs>
              <Form.Label>Junior High School</Form.Label>
              <Input
                {...attrs}
                placeholder="Name of Junior High School"
                bind:value={$formData.Junior_High_School}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Junior_High_School_Location">
            <Form.Control let:attrs>
              <Form.Label>Location</Form.Label>
              <Input
                {...attrs}
                placeholder="Location of Junior High School"
                bind:value={$formData.Junior_High_School_Location}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <Form.Field {form} name="JHS_Type">
          <Form.Control let:attrs>
            <Form.Label>Type of Junior High School</Form.Label>
            <div class="grid grid-cols-2 gap-4">
              <div
                class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
              >
                PRIVATE
              </div>
              <div
                class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
              >
                PUBLIC
              </div>
            </div>
            <div class="gap-4 md:grid md:grid-cols-2">
              <div class="gap-4 md:grid md:grid-cols-2">
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Exclusive</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Co-ed</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Sectarian</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Non-sectarian</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Vocational/Technical</label
                  >
                </div>
              </div>
  
              <div class="gap-4 md:grid md:grid-cols-2">
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >City</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >National</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Provincial</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Barangay</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Agricultural</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Technical/Vocational</label
                  >
                </div>
              </div>
            </div>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <Form.Field {form} name="Junior_Number_Of_Students">
          <Form.Control let:attrs>
            <Form.Label
              >The number of students in my Junior High School graduating class
              was:</Form.Label
            >
            <Select.Root>
              <Select.Trigger>
                <Select.Value placeholder="Select an option." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each numberstud as numberstud}
                    <Select.Item value={numberstud.value} label={numberstud.label}
                      >{numberstud.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
              <Select.Input name="Number_Of_Students" />
            </Select.Root>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <hr />
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Senior_High_School">
            <Form.Control let:attrs>
              <Form.Label>Senior High School</Form.Label>
              <Input
                {...attrs}
                placeholder="Name of Senior High School"
                bind:value={$formData.Senior_High_School}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Senior_High_School_Location">
            <Form.Control let:attrs>
              <Form.Label>Location</Form.Label>
              <Input
                {...attrs}
                placeholder="Location of Senior High School"
                bind:value={$formData.Senior_High_School_Location}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <Form.Field {form} name="SHS_Type">
          <Form.Control let:attrs>
            <Form.Label>Type of Senior High School</Form.Label>
            <div class="grid grid-cols-2 gap-4">
              <div
                class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
              >
                PRIVATE
              </div>
              <div
                class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
              >
                PUBLIC
              </div>
            </div>
            <div class="gap-4 md:grid md:grid-cols-2">
              <div class="gap-4 md:grid md:grid-cols-2">
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Exclusive</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Co-ed</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Sectarian</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Non-sectarian</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Vocational/Technical</label
                  >
                </div>
              </div>
  
              <div class="gap-4 md:grid md:grid-cols-2">
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >City</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >National</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Provincial</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Barangay</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Agricultural</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Technical/Vocational</label
                  >
                </div>
              </div>
            </div>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <Form.Field {form} name="Senior_Number_Of_Students">
          <Form.Control let:attrs>
            <Form.Label
              >The number of students in my Senior High School graduating class
              was:</Form.Label
            >
            <Select.Root>
              <Select.Trigger>
                <Select.Value placeholder="Select an option." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each numberstud as numberstud}
                    <Select.Item value={numberstud.value} label={numberstud.label}
                      >{numberstud.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
              <Select.Input name="Number_Of_Students" />
            </Select.Root>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <hr />
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="HS_Rank">
            <Form.Control let:attrs>
              <Form.Label
                >My rank in High School was (if not sure, give your best
                estimate):</Form.Label
              >
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select an option." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each HSrank as HSrank}
                      <Select.Item value={HSrank.value} label={HSrank.label}
                        >{HSrank.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="HS_Rank" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="School_Ave">
            <Form.Control let:attrs>
              <Form.Label>My overall school average was:</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select an option." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each SchoolAve as SchoolAve}
                      <Select.Item value={SchoolAve.value} label={SchoolAve.label}
                        >{SchoolAve.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="School_Ave" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Honors">
            <Form.Control let:attrs>
              <Form.Label>Honors Received:</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select an option." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each honors as honors}
                      <Select.Item value={honors.value} label={honors.label}
                        >{honors.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Honors" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Awards">
            <Form.Control let:attrs>
              <Form.Label>Other Awards/Honors Received:</Form.Label>
              <Input
                {...attrs}
                placeholder="Awards/Honors"
                bind:value={$formData.Awards}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
        <hr />
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="First_Campus">
            <Form.Control let:attrs>
              <Form.Label>First Choice of Campus</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your first choice." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each campus as campus}
                      <Select.Item value={campus.value} label={campus.label}
                        >{campus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="First_Campus" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="First_Campus_Reason">
            <Form.Control let:attrs>
              <Form.Label>Reason/s</Form.Label>
              <Input
                {...attrs}
                placeholder="Reason/s"
                bind:value={$formData.Reason}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Second_Campus">
            <Form.Control let:attrs>
              <Form.Label>Second Choice of Campus</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your second choice." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each campus as campus}
                      <Select.Item value={campus.value} label={campus.label}
                        >{campus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Second_Campus" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Second_Campus_Reason">
            <Form.Control let:attrs>
              <Form.Label>Reason/s</Form.Label>
              <Input
                {...attrs}
                placeholder="Reason/s"
                bind:value={$formData.Reason}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>
  
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Financial Information</h1>
        <p class="mb-4">
          To plan financial programs for entering students, schools need to know
          the financial background of their students. Please estimate as
          accurately as you can your family's <b>MONTHLY</b> income.
        </p>
  
        <Form.Field {form} name="Income">
          <Form.Control let:attrs>
            <Form.Label>Family's Monthly Income</Form.Label>
            <Select.Root>
              <Select.Trigger>
                <Select.Value
                  placeholder="Select your family's monthly income."
                />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each income as income}
                    <Select.Item value={income.value} label={income.label}
                      >{income.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
              <Select.Input name="Income" />
            </Select.Root>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <Form.Field {form} name="Source_Of_Income">
          <Form.Control let:attrs>
            <Form.Label
              >What is/are the source/s of your family's income? (Check as many
              that applies)</Form.Label
            >
            <div class="gap-4 md:grid md:grid-cols-5">
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >None</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Salaries/Wages</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Farming/Fishing</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Own Business</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Pension</label
                >
              </div>
            </div>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <Form.Field {form} name="Other_Sources">
          <Form.Control let:attrs>
            <Form.Label
              >Other sources of income of your family that was not stated above.</Form.Label
            >
            <Input
              {...attrs}
              placeholder=""
              bind:value={$formData.other_sources}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <Form.Field {form} name="Allowance">
          <Form.Control let:attrs>
            <Form.Label
              >Indicate the allowance you expect to receive <b
                >monthly (EXCLUDING</b
              > board & lodging)
            </Form.Label>
            <Input {...attrs} placeholder="PhP" bind:value={$formData.Guardian} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <Form.Field {form} name="Source_Of_Allowance">
          <Form.Control let:attrs>
            <Form.Label>Check below the source/s of your allowances</Form.Label>
            <div class="gap-4 md:grid md:grid-cols-2">
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Parents and/or relatives</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Study-now-pay-later plan</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Student Assistantship</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Scholarship/Fellowship (specify)</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Part-time work outside of UP</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Savings from previous earnings</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >STFAP (specify bracket)</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Other forms of financial aid from outside sources (e.g. private
                  endowment)</label
                >
              </div>
            </div>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Specifics">
            <Form.Control let:attrs>
              <Form.Label
                >Specify details of checked options stated above (ex.
                Scholarship/STFAP).</Form.Label
              >
              <Input {...attrs} placeholder="" bind:value={$formData.specifics} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Second_Other_Sources">
            <Form.Control let:attrs>
              <Form.Label
                >Other sources of allowance that was not stated above.</Form.Label
              >
              <Input
                {...attrs}
                placeholder=""
                bind:value={$formData.other_sources}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>
  
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Vocational Plans</h1>
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Course">
            <Form.Control let:attrs>
              <Form.Label>Course</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select a course." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each course as course}
                      <Select.Item value={course.value} label={course.label}
                        >{course.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Course" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Major">
            <Form.Control let:attrs>
              <Form.Label>Major</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select a major." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each major as major}
                      <Select.Item value={major.value} label={major.label}
                        >{major.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Major" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <Form.Field {form} name="Satisfaction">
          <Form.Control let:attrs>
            <Form.Label>Are you satisfied with your course?</Form.Label>
            <Select.Root>
              <Select.Trigger>
                <Select.Value placeholder="Select your answer." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each YN as YN}
                    <Select.Item value={YN.value} label={YN.label}
                      >{YN.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
              <Select.Input name="Satisfaction" />
            </Select.Root>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
  
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Yes_Reasons">
            <Form.Control let:attrs>
              <Form.Label
                >If <b>YES</b>, check the reasons for choosing this course.
                (Checkbox)</Form.Label
              >
              <div class="gap-4 md:grid md:grid-cols-2">
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >It is my interest.</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >There is a great opportunity to serve others.</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >I will be able to utilize my talents.</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >There is a great demand for graduates of this course.</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Prospect of good salary after graduation.</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >It is prestigious.</label
                  >
                </div>
              </div>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="No_Reasons">
            <Form.Control let:attrs>
              <Form.Label
                >If <b>NO</b>, check your reasons why you do not like your course.
                (Checkbox)</Form.Label
              >
              <div class="gap-4 md:grid md:grid-cols-2">
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Still undecided.</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >It was my parents' <br />or others' choice.</label
                  >
                </div>
                <div
                  class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value=""
                    name="bordered-checkbox"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    for="bordered-checkbox-1"
                    class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >The course I like is not offered in UP Baguio.</label
                  >
                </div>
                <Form.Field {form} name="Other_Course">
                  <Form.Control let:attrs>
                    <Form.Label>What course do you prefer?</Form.Label>
                    <Input
                      {...attrs}
                      placeholder=""
                      bind:value={$formData.Other_Course}
                    />
                  </Form.Control>
                  <Form.FieldErrors />
                </Form.Field>
              </div>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Other_Yes_Reasons">
            <Form.Control let:attrs>
              <Form.Label>Other reasons not stated above.</Form.Label>
              <Input
                {...attrs}
                placeholder=""
                bind:value={$formData.Other_Yes_Reasons}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Other_No_Reasons">
            <Form.Control let:attrs>
              <Form.Label>Other reasons not stated above.</Form.Label>
              <Input
                {...attrs}
                placeholder=""
                bind:value={$formData.Other_No_Reasons}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Finish_In_UPB">
            <Form.Control let:attrs>
              <Form.Label
                >Do you intend to finish your course here at UP Baguio?</Form.Label
              >
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your answer." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each YN as YN}
                      <Select.Item value={YN.value} label={YN.label}
                        >{YN.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="Finish_In_UPB" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Second_No_Reasons">
            <Form.Control let:attrs>
              <Form.Label
                >If <b>NO</b>, where do you intend to transfer?
              </Form.Label>
              <Input
                {...attrs}
                placeholder=""
                bind:value={$formData.Second_No_Reasons}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
  
        <Form.Field {form} name="Future_Plans">
          <Form.Control let:attrs>
            <Form.Label
              >What are your plans after graduation? (Please check as many as
              appropriate)(Checkbox)</Form.Label
            >
            <div class="gap-4 md:grid md:grid-cols-2">
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Work in hometown</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Work in private sector</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Work in the government</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Work anywhere in the Philippines</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Work abroad</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Pursue graduate studies in UP.</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Pursue graduate studies abroad.</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Pursue graduate studies in other school in PH.</label
                >
              </div>
              <div
                class="flex items-center rounded border border-gray-200 ps-4 dark:border-gray-700"
              >
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  for="bordered-checkbox-1"
                  class="ms-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Set up own business/firm/private practice</label
                >
              </div>
              <Form.Field {form} name="Second_Other_Sources_V">
                <Form.Control let:attrs>
                  <Form.Label>Others (Please specify)</Form.Label>
                  <Input
                    {...attrs}
                    placeholder=""
                    bind:value={$formData.other_sources}
                  />
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>
            </div>
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
  
      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Leisure Time Activities</h1>
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Recreational_Activities">
            <Form.Control let:attrs>
              <Form.Label>Recreation/social activities:</Form.Label>
              <Input {...attrs} bind:value={$formData.Recreational_Activities} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Interests">
            <Form.Control let:attrs>
              <Form.Label>Special interests/hobbies:</Form.Label>
              <Input {...attrs} bind:value={$formData.Interests} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Clubs_Joined">
            <Form.Control let:attrs>
              <Form.Label>Clubs/Organization you belong to:</Form.Label>
              <Input {...attrs} bind:value={$formData.Clubs_Joined} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Clubs_To_Join">
            <Form.Control let:attrs>
              <Form.Label>Clubs/Organization you would like to join:</Form.Label>
              <Input {...attrs} bind:value={$formData.Clubs_To_Join} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="reading">
            <Form.Control let:attrs>
              <Form.Label>Do you like reading?</Form.Label>
              <Select.Root>
                <Select.Trigger>
                  <Select.Value placeholder="Select your answer." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each YN as YN}
                      <Select.Item value={YN.value} label={YN.label}
                        >{YN.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
                <Select.Input name="reading" />
              </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
  
          <Form.Field {form} name="Reading">
            <Form.Control let:attrs>
              <Form.Label>If yes, what do you like to read?</Form.Label>
              <Input {...attrs} bind:value={$formData.Reading} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>
  
      <div
        class="center relative top-1/2 mb-10 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Closing Question</h1>
        <p>
          What are your dreams and aspirations in life, your expectations of UP
          Baguio, and your objectives for studying in UPB?
        </p>
  
        <Form.Field {form} name="Dreams">
          <Form.Control let:attrs>
            <Input {...attrs} bind:value={$formData.Dreams} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <div class="center relative top-1/2 mb-10 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8">
        <h1> Appointment History</h1>
        <div class="table-wrp relative block max-h-96 overflow-x-auto rounded-lg border border-none">
          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead class="sticky top-0 bg-rose-900 text-xs uppercase text-gray-700 text-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-5"> Appointment ID </th>
                <th scope="col" class="px-3 py-5"> Date</th>
                <th scope="col" class="px-3 py-5"> Time </th>
                <th scope="col" class="px-3 py-5"> Nature of Concern </th>
                <th scope="col" class="px-6 py-5"> Remarks </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">00001</th>
                <td class="px-6 py-4"> 02-14-24 </td>
                <td class="px-6 py-4"> 2:30 PM </td>
                <td class="px-6 py-4"> Secret </td>
                <td class="px-6 py-4">
                  <Form.Field {form} name="Remarks">
                    <Form.Control let:attrs>
                      <Input {...attrs} bind:value={$formData.Remarks1} />
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>
                </td>
              </tr>
              <tr class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">00042</th>
                <td class="px-6 py-4"> 03-10-24 </td>
                <td class="px-6 py-4"> 3:30 AM </td>
                <td class="px-6 py-4"> Secret nga </td>
                <td class="px-6 py-4">
                  <Form.Field {form} name="Remarks">
                    <Form.Control let:attrs>
                      <Input {...attrs} bind:value={$formData.Remarks2} />
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>
                </td>
              </tr>
              <tr class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">00095</th>
                <td class="px-6 py-4"> 04-13-24 </td>
                <td class="px-6 py-4"> 11:30 AM </td>
                <td class="px-6 py-4"> Kulet nmn </td>
                <td class="px-6 py-4">
                  <Form.Field {form} name="Remarks">
                    <Form.Control let:attrs>
                      <Input {...attrs} bind:value={$formData.Remarks3} />
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>
                </td>
              </tr>
              <tr class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">00112</th>
                <td class="px-6 py-4"> 04-12-24 </td>
                <td class="px-6 py-4"> 1:30 PM </td>
                <td class="px-6 py-4"> SECRET NGA!! </td>
                <td class="px-6 py-4">
                  <Form.Field {form} name="Remarks">
                    <Form.Control let:attrs>
                      <Input {...attrs} bind:value={$formData.Remarks4} />
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>
                </td>
              </tr>
              <tr class="border-b odd:bg-white even:bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">00120</th>
                <td class="px-6 py-4"> 04-24-24 </td>
                <td class="px-6 py-4"> 10:30 AM </td>
                <td class="px-6 py-4"> SECREEET!!! </td>
                <td class="px-6 py-4">
                  <Form.Field {form} name="Remarks">
                    <Form.Control let:attrs>
                      <Input {...attrs} bind:value={$formData.Remarks5} />
                    </Form.Control>
                    <Form.FieldErrors />
                  </Form.Field>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div class="gap-4 md:grid md:grid-cols-2">
        <Button
          data-tooltip-target="tooltip-light2"
          data-tooltip-style="light"
          variant="bigbutton"
          size="icon"
          class="mr-1 w-full"
          on:click={() => goto("#")}>DOWNLOAD</Button>
        <Button
          data-tooltip-target="tooltip-light2"
          data-tooltip-style="light"
          variant="bigbutton"
          size="icon"
          class="mr-1 w-full"
          on:click={() => goto("/admin/records/edit")}>EDIT</Button>
      </div>
    </form>
  </div>
