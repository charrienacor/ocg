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
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import FormLegend from "$lib/components/ui/form/form-legend.svelte";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value: DateValue | undefined = undefined;

  export let data: any;
  export let counselors: any;
  export let name: any;
  export let email: any;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;

  $: selectedCounselor = $formData.email
    ? {
        label: $formData.CName,
        value: $formData.Counselor,
      }
    : undefined;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="Student_Name">
    <Form.Control let:attrs>
      <Form.Label>Student Name</Form.Label>
      <Input {...attrs} disabled bind:value={name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Student_Email">
    <Form.Control let:attrs>
      <Form.Label>Student Email</Form.Label>
      <Input {...attrs} disabled bind:value={email} />
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

  <Form.Field {form} name="Guidance_Counselor">
    <Form.Control let:attrs>
      <Form.Label>Guidance Counselor</Form.Label>
      <Select.Root
        selected={selectedCounselor}
        onSelectedChange={(v) => {
          v && ($formData.Counselor = v.label);
        }}
      >
        <Select.Trigger {...attrs}>
          <Select.Value placeholder="Select a Guidance Counselor" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each counselors as counselor}
              <Select.Item
                value={counselor.Counselor_Email}
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

  <Form.Field {form} name="Appointment_Date">
    <Form.Control>
      <Form.Label>Appointment Schedule<br /></Form.Label>
      <Popover.Root>
        <Popover.Trigger asChild let:builder>
          <Button
            variant="outline"
            class={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
            builders={[builder]}
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            {value
              ? df.format(value.toDate(getLocalTimeZone()))
              : "Pick a date"}
          </Button>
        </Popover.Trigger>
        <Popover.Content class="w-auto p-0" align="start">
          <Calendar bind:value />
        </Popover.Content>
      </Popover.Root>
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Appointment_Time">
    <Form.Control let:attrs>
      <Form.Label>Appointment Time</Form.Label>
      <Input {...attrs} bind:value={$formData.Appointment_Time} />
    </Form.Control>
    <Form.Description>Please use HH:MM (24-hour format).</Form.Description>
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

<!-- CREATE TABLE Appointments(
    Appointment_ID INTEGER(12) NOT NULL UNIQUE,
    Student_Name VARCHAR(100) NOT NULL,
    Student_Email VARCHAR (30) NOT NULL,
    Student_ID INTEGER(9) NOT NULL,
    Counselor_Email VARCHAR(30) NOT NULL,
    Appointment_Date DATE NOT NULL,
    Appointment_Time TIME NOT NULL,
    Nature_Of_Concern VARCHAR(1000),
    Appointment_Status ENUM('Approved', 'Pending', 'Rejected', 'Completed'),
    PRIMARY KEY (Appointment_ID),
    FOREIGN KEY (Counselor_Email) REFERENCES Counselors(Counselor_Email),
); -->
