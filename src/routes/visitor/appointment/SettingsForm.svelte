<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import {
    CalendarDate,
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
  import FormDescription from "$lib/components/ui/form/form-description.svelte";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value: DateValue | undefined = undefined;
  $: value = $formData.App_Date ? parseDate($formData.App_Date) : undefined;
  let placeholder: DateValue = today(getLocalTimeZone());

  export let data: any;
  export let counselors: any;
  export let name: any;
  export let email: any;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;

  const hours = [
    { value: "07", label: "7" },
    { value: "08", label: "8" },
    { value: "09", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
  ];

  const minutes = [
    { value: "00", label: "00" },
    { value: "05", label: "05" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
    { value: "25", label: "25" },
    { value: "30", label: "30" },
    { value: "35", label: "35" },
    { value: "40", label: "40" },
    { value: "45", label: "45" },
    { value: "50", label: "50" },
    { value: "55", label: "55" },
  ];

  $: selectedCounselor = $formData.Counselor
    ? {
        label: $formData.CName,
        value: $formData.Counselor,
      }
    : undefined;

  $: selectedHour = $formData.Hour
    ? {
        label: $formData.Hour,
        value: $formData.Hour,
      }
    : undefined;

  $: selectedMinute = $formData.Minute
    ? {
        label: $formData.Minute,
        value: $formData.Minute,
      }
    : undefined;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="Visitor_Name">
    <Form.Control let:attrs>
      <Form.Label>Name</Form.Label>
      <Input {...attrs} bind:value={name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Visitor_Email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={email} />
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
                console.log(v.toString());
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
  <div class="flex flex-row">
    <Form.Field {form} name="Appointment_Hour">
      <Form.Control let:attrs>
        <Form.Label>Appointment Time</Form.Label>
        <Select.Root
          selected={selectedHour}
          onSelectedChange={(v) => {
            v && ($formData.Hour = v.value);
          }}
        >
          <Select.Trigger {...attrs} class="w-[100px]">
            <Select.Value placeholder="HH" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              {#each hours as hour}
                <Select.Item value={hour.value} label={hour.label}
                  >{hour.label}</Select.Item
                >
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <input hidden bind:value={$formData.Hour} name={attrs.name} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="Appointment_Minute">
      <Form.Control let:attrs>
        <Form.Label><br /></Form.Label>
        <Select.Root
          selected={selectedMinute}
          onSelectedChange={(v) => {
            v && ($formData.Minute = v.value);
          }}
        >
          <Select.Trigger {...attrs} class="w-[100px]">
            <Select.Value placeholder="MM" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              {#each minutes as minute}
                <Select.Item value={minute.value} label={minute.label}
                  >{minute.label}</Select.Item
                >
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <input hidden bind:value={$formData.Minute} name={attrs.name} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>

  <Form.Field {form} name="Nature_Of_Concern">
    <Form.Control let:attrs>
      <Form.Label>Nature of Concern</Form.Label>
      <Input {...attrs} bind:value={$formData.Nature_Of_Concern} />
    </Form.Control>
    <Form.Description>Kindly indicate if urgent</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button>Submit</Form.Button>
</form>
