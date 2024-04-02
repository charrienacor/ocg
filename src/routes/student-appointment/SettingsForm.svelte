<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let data: any;

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<Card.Root class="w-1/3">
  <Card.Header>
    <Card.Title>Book an Appointment</Card.Title>
  </Card.Header>
  <Card.Content>
    <form method="POST" use:enhance>
      <Form.Field {form} name="Student_Name">
        <Form.Control let:attrs>
          <Form.Label>Student Name</Form.Label>
          <Input disabled {...attrs} bind:value={$formData.Student_Name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="Student_Email">
        <Form.Control let:attrs>
          <Form.Label>Student Email</Form.Label>
          <Input {...attrs} disabled bind:value={$formData.Student_Email} />
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

      <Form.Field {form} name="Nature_Of_Concern">
        <Form.Control let:attrs>
          <Form.Label>Nature of Concern</Form.Label>
          <Input {...attrs} bind:value={$formData.Nature_Of_Concern} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Button>Submit</Form.Button>
    </form>
  </Card.Content>
</Card.Root>

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
