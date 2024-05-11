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
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
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

  export let data: any;
  export let counselors: any;
  export let colleges: any;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="Admin_Email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="First_Name">
    <Form.Control let:attrs>
      <Form.Label>First Name</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="Middle_Name">
    <Form.Control let:attrs>
      <Form.Label>Middle Name</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="Last_Name">
    <Form.Control let:attrs>
      <Form.Label>Last Name</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field
    {form}
    name="RGC"
    class="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4"
  >
    <Form.Control let:attrs>
      <Checkbox {...attrs} bind:checked={$formData.mobile} />
      <div class="space-y-1 leading-none">
        <Form.Label>Registered Guidance Counselor (RGC)?</Form.Label>
      </div>
      <input name={attrs.name} value={$formData.mobile} hidden />
    </Form.Control>
  </Form.Field>

  <Form.Button>Submit</Form.Button>
</form>
