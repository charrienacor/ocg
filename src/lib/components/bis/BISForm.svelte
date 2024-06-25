<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./schema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { cn } from "$lib/utils.js";
  import SuperDebug, {
    type Infer,
    type SuperValidated,
    superForm,
  } from "sveltekit-superforms";
  import { toast } from "svelte-sonner";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { onMount } from "svelte";
  export let data: any | SuperValidated<Infer<FormSchema>>;
  const form = superForm(data, {
    dataType: "json",
    validators: zodClient(formSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted the form successfully.`);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    },
  });
  const { form: formData, enhance } = form;
  interface Field {
    formID: string;
    label: string;
    placeholder: string;
    bind: any;
  }
  const preliminaryFields: ArrayLike<Field> = [
    {
      formID: "Semester",
      label: "Semester",
      placeholder: "Semester",
      bind: $formData.Semester,
    },
    {
      formID: "School_Year",
      label: "School Year",
      placeholder: "2XXX-2XXX",
      bind: $formData.School_Year,
    },
    {
      formID: "Student_Number",
      label: "Student Number",
      placeholder: "20XX-XXXXX",
      bind: $formData.Student_Number,
    },
    {
      formID: "Course",
      label: "Course/Degree Program",
      placeholder: "Your course assignment",
      bind: $formData.Course,
    },
    {
      formID: "College",
      label: "Colege",
      placeholder: "CS/CSS/CAC",
      bind: $formData.College,
    },
  ];
</script>

<div class="relative mb-10 mt-5">
  <h1 class="pt-6 font-bold md:pt-0">BACKGROUND INFORMATION SHEET</h1>
  <h2><b>TO THE STUDENT:</b></h2>
  <h3>
    The purpose of this form is to bring together all essential information that
    may enable us to help you meet your specific needs & future plans. The
    information will be kept confidential. Please answer CAREFULLY, COMPLETELY,
    & SINCERELY.
  </h3>

  <form method="POST" use:enhance>
    <div
      class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
    >
      <div class="md:grid md:grid-cols-2 md:gap-4">
        {#each preliminaryFields as field}
          <Form.Field {form} name={field.formID}>
            <Form.Control let:attrs>
              <Form.Label>{field.label}</Form.Label>
              <Input
                {...attrs}
                placeholder={field.placeholder}
                bind:value={field.bind}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        {/each}
      </div>
      <Form.Button>Submit</Form.Button>
    </div>
  </form>
</div>
