<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema } from "./schema";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
    today,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value: DateValue | undefined = undefined;
  $: value = $formData.App_Date ? parseDate($formData.App_Date) : undefined;
  let placeholder: DateValue = today(getLocalTimeZone());

  export let data: any;
  export let counselors: any;
  export let colleges: any;
  export let timeslots: any;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;

  $: dayTime = "";

  $: selectedCounselor = $formData.Counselor
    ? {
        label: $formData.CName,
        value: $formData.Counselor,
      }
    : undefined;

  $: selectedCollege = $formData.College
    ? {
        label: $formData.College,
        value: $formData.College,
      }
    : undefined;
  $: selectedTime = $formData.Appointment_Time
    ? {
        label: $formData.Appointment_Time,
        value: $formData.Appointment_Time,
      }
    : undefined;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="Student_Name">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Student Name
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Input {...attrs} bind:value={$formData.Student_Name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Student_Email">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Student Email
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Input {...attrs} bind:value={$formData.Student_Email} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Student_ID">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Student Number
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Input
        {...attrs}
        placeholder="20XXXXXXX"
        bind:value={$formData.Student_ID}
      />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Contact_Number">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Contact Number
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Input
        {...attrs}
        placeholder="09XXXXXXXXX"
        bind:value={$formData.Contact_Number}
      />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="College">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >College
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Select.Root
        selected={selectedCollege}
        onSelectedChange={(v) => {
          v && ($formData.College = v.value);
        }}
      >
        <Select.Trigger {...attrs} class="w-[250px]">
          <Select.Value placeholder="Select a College" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each colleges as college}
              <Select.Item
                value={college.College}
                label="College of {college.College}"
              ></Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <input hidden bind:value={$formData.College} name={attrs.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Course">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Degree Program
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Input {...attrs} bind:value={$formData.Course} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Guidance_Counselor">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Guidance Counselor
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Select.Root
        selected={selectedCounselor}
        onSelectedChange={(v) => {
          v && ($formData.Counselor = v.value) && ($formData.CName = v.label);
        }}
      >
        <Select.Trigger {...attrs} class="w-[250px]">
          <Select.Value placeholder="Select a Guidance Counselor" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each counselors as counselor}
              <Select.Item
                value={counselor._id}
                label="{counselor.First_Name} {counselor.Last_Name}"
                >{counselor.First_Name} {counselor.Last_Name}</Select.Item
              >
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <input hidden bind:value={$formData.Counselor} name={attrs.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Appointment_Date" class="flex flex-col">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Appointment Date
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Popover.Root>
        <Popover.Trigger
          {...attrs}
          class={cn(
            buttonVariants({ variant: "outline" }),
            "w-[180px] justify-start pl-4 text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
          <CalendarIcon class="ml-auto h-4 w-4 opacity-50 " />
        </Popover.Trigger>
        <Popover.Content class="w-auto p-0" side="top">
          <Calendar
            {value}
            bind:placeholder
            minValue={today(getLocalTimeZone())}
            calendarLabel="Appointment Date"
            initialFocus
            onValueChange={(v) => {
              if (v) {
                $formData.App_Date = v.toString();
                dayTime = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ][v.toDate(getLocalTimeZone()).getDay()];
              } else {
                $formData.App_Date = "";
              }
            }}
          />
        </Popover.Content>
      </Popover.Root>

      <Form.FieldErrors />
      <input hidden value={$formData.App_Date} name={attrs.name} />
    </Form.Control>
  </Form.Field>
  <Form.Field {form} name="Appointment_Time">
    <Form.Control let:attrs>
      <Form.Label class="flex flex-row gap-1"
        >Appointment Time
        <p class="text-xs text-red-500">*</p></Form.Label
      >
      <Select.Root
        selected={selectedTime}
        onSelectedChange={(v) => {
          v && ($formData.Appointment_Time = v.value);
        }}
      >
        <Select.Trigger {...attrs} class="w-[200px]">
          <Select.Value placeholder="Pick a time" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each timeslots as timeslot}
              {#if $formData.Counselor === timeslot.Email}
                {#if dayTime === "Monday"}
                  {#each timeslot.Monday as time}
                    <Select.Item value={time} label={time}>{time}</Select.Item>
                  {/each}
                {:else if dayTime === "Tuesday"}
                  {#each timeslot.Tuesday as time}
                    <Select.Item value={time} label={time}>{time}</Select.Item>
                  {/each}
                {:else if dayTime === "Wednesday"}
                  {#each timeslot.Wednesday as time}
                    <Select.Item value={time} label={time}>{time}</Select.Item>
                  {/each}
                {:else if dayTime === "Thursday"}
                  {#each timeslot.Thursday as time}
                    <Select.Item value={time} label={time}>{time}</Select.Item>
                  {/each}
                {:else if dayTime === "Friday"}
                  {#each timeslot.Friday as time}
                    <Select.Item value={time} label={time}>{time}</Select.Item>
                  {/each}
                {/if}
              {/if}
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <input hidden bind:value={$formData.Appointment_Time} name={attrs.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Nature_Of_Concern">
    <Form.Control let:attrs>
      <Form.Label>Nature of Concern</Form.Label>
      <Input {...attrs} bind:value={$formData.Nature_Of_Concern} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  {#if $formData.Student_Name === "" || $formData.Student_Name === undefined || $formData.Student_Email === "" || $formData.Student_Email === undefined || $formData.Student_ID === "" || $formData.Student_ID === undefined || $formData.College === "" || $formData.College === undefined || $formData.Course === "" || $formData.Course === undefined || $formData.Counselor === "" || $formData.Counselor === undefined || $formData.App_Date === undefined || $formData.App_Date === "" || $formData.Appointment_Time === "" || $formData.Appointment_Time === undefined}
    <Form.Button disabled>Submit</Form.Button>
  {:else}
    <Form.Button>Submit</Form.Button>
  {/if}
</form>
