<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./schema";
  import {
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
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
    { value: "ms_cre", label: "Master of Science in Conservation and Restoration Ecology" },
    { value: "ms_math", label: "Master of Science in Mathematics" },
    { value: "phd_math", label: "Ph.D. in Mathematics" },
    { value: "ba_ss", label: "Bachelor of Arts in Social Sciences" },
    { value: "bs_me", label: "Bachelor of Science in Management Economics" },
    { value: "mm", label: "Master of Management" },
    { value: "ma_sds", label: "Master of Arts in Social and Development Studies" },
  ];
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

  <body class="relative mt-5 mb-10">
    <h1 class="font-bold"> BACKGROUND INFORMATION SHEET </h1>
    <form method="POST" use:enhance>
    <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
      <h1> Preliminaries </h1>
      <Form.Field {form} name="Semester">
        <Form.Control let:attrs>
          <Form.Label>Semester</Form.Label>
          <Select.Root>
            <Select.Trigger>
              <Select.Value
                placeholder="Select a semester."
              />
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
            <Select.Input name="favoriteFruit" />
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="School_Year">
        <Form.Control let:attrs>
          <Form.Label>School Year</Form.Label>
          <Input 
            {...attrs} 
            placeholder="20XX-20XX"
            bind:value={$formData.School_Year} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="Student_ID">
        <Form.Control let:attrs>
          <Form.Label>Student Number</Form.Label>
          <Input
            {...attrs}
            placeholder="20XXXXXXX"
            bind:value={$formData.Student_ID}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="Degree_Program">
        <Form.Control let:attrs>
          <Form.Label>Course/Degree Program</Form.Label>
          <Select.Root>
            <Select.Trigger>
              <Select.Value
                placeholder="Select a course/degree program."
              />
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
            <Select.Input name="favoriteFruit" />
          </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
      <h1> Personal Information</h1>
      <p class="mb-7"><b>TO THE STUDENT:</b> The purpose of this form is to bring together all essential information 
        that may enable us to help you meet your specific needs & future plans. The information will be 
        kept confidential. Please answer CAREFULLY, COMPLETELY & SINCERELY.</p>
        <Form.Field {form} name="Student_Name">
          <Form.Control let:attrs>
            <Form.Label>Name</Form.Label>
            <Input 
              {...attrs} 
              placeholder="Surname, First Name, Middle Name"
              bind:value={$formData.Student_Name} />
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
      </div>

      <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
        <h1> Family Data </h1>
      </div>

      <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
        <h1> Children in the Family </h1>
      </div>

      <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
        <h1> Educational Background </h1>
      </div>

      <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
        <h1> Financial Information </h1>
      </div>

      <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
        <h1> Vocational Plans </h1>
      </div>

      <div class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
        <h1> Leisure Time Activities </h1>
          <Form.Field {form} name="Recreational_Activities">
            <Form.Control let:attrs>
              <Form.Label>Recreation/social activities:</Form.Label>
              <Input {...attrs} bind:value={$formData.Recreational_Activities} />
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

          <Form.Field {form} name="Interests">
            <Form.Control let:attrs>
              <Form.Label>Special interests/hobbies:</Form.Label>
              <Input {...attrs} bind:value={$formData.Interests} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Reading">
            <Form.Control let:attrs>
              <Form.Label>Do you like reading? (If yes, what do you like reading?)</Form.Label>
              <Input {...attrs} bind:value={$formData.Reading} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
      </div>

      <div class="center relative top-1/2 mt-10 mb-10 flex flex-col gap-3 rounded-lg bg-white px-8 py-8">
        <h1> Closing Question </h1>
        <p>On the space below, write about your dreams and aspirations in life, your expectations of UP Baguio,
          and your objectives for studying in UPB. </p>

        <Form.Field {form} name="Dreams">
          <Form.Control let:attrs>
            <Input {...attrs} bind:value={$formData.Dreams} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
      <Form.Button class="w-full">Submit</Form.Button>
    </form>
  </body>