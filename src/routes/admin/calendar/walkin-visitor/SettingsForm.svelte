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
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
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

  $: selectedTime = $formData.Appointment_Time
    ? {
        label: $formData.Appointment_Time,
        value: $formData.Appointment_Time,
      }
    : undefined;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="Visitor_Name">
    <Form.Control let:attrs>
      <Form.Label>Name</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Visitor_Email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Contact_Num">
    <Form.Control let:attrs>
      <Form.Label>Contact Number</Form.Label>
      <Input {...attrs} bind:value={$formData.Contact} />
    </Form.Control>
    <Form.Description
      >If more than one contact number, seperate with " | "</Form.Description
    >
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Visitor_Institution">
    <Form.Control let:attrs>
      <Form.Label>Associated Institution</Form.Label>
      <Input {...attrs} bind:value={$formData.Institution} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Guidance_Counselor">
    <Form.Control let:attrs>
      <Form.Label>Guidance Counselor</Form.Label>
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
      <Form.Label>Appointment Date<br /></Form.Label>
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
      <Form.Label>Appointment Time</Form.Label>
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

  <Form.Button>Submit</Form.Button>
</form>
