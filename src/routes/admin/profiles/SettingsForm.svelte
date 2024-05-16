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
  import * as Select from "$lib/components/ui/select/index.js";

  export let data: any;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;

  const statuses = [
    { label: "Active", value: "Active" },
    { label: "On-leave", value: "On-leave" },
    { label: "Deny-Access", value: "Deny-Access" },
  ];

  $: selectedStatus = $formData.Status
    ? {
        label: $formData.Status,
        value: $formData.Status,
      }
    : undefined;
</script>

<form method="POST" action="?/add" use:enhance>
  <Form.Field {form} name="Admin_Email">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="First_Name">
    <Form.Control let:attrs>
      <Form.Label>First Name</Form.Label>
      <Input {...attrs} bind:value={$formData.firstName} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="Middle_Name">
    <Form.Control let:attrs>
      <Form.Label>Middle Name</Form.Label>
      <Input {...attrs} bind:value={$formData.middleName} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="Last_Name">
    <Form.Control let:attrs>
      <Form.Label>Last Name</Form.Label>
      <Input {...attrs} bind:value={$formData.lastName} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="Status">
    <Form.Control let:attrs>
      <Form.Label>Status</Form.Label>
      <Select.Root
        selected={selectedStatus}
        onSelectedChange={(v) => {
          v && ($formData.Status = v.value);
        }}
      >
        <Select.Trigger {...attrs} class="w-[250px]">
          <Select.Value placeholder="Select Status" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each statuses as status}
              <Select.Item value={status.value} label={status.label}
              ></Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <input hidden bind:value={$formData.Status} name={attrs.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field
    {form}
    name="RGC"
    class="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4"
  >
    <Form.Control let:attrs>
      <Checkbox {...attrs} bind:checked={$formData.RGC} />
      <div class="space-y-1 leading-none">
        <Form.Label>Registered Guidance Counselor (RGC)?</Form.Label>
      </div>
      <input name={attrs.name} value={$formData.RGC} hidden />
    </Form.Control>
  </Form.Field>

  <Form.Button>Submit</Form.Button>
</form>
