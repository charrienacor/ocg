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

  $: selectedCounselor = $formData.email
    ? {
        label: $formData.CNamd,
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
          v && ($formData.Counselor = v.value);
          console.log(v);
        }}
      >
        <Select.Trigger {...attrs} class="w-[250px]">
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
      <input hidden bind:value={$formData.email} name={attrs.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="Appointment_Date">
    <Form.Control>
      <Form.Label>Appointment Date<br /></Form.Label>
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
      <div class="flex flex-row gap-1">
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
      </div>
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
