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

  onMount(() => {
    const picture = document.getElementById("picture");

    if (picture) {
      picture.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
          const reader = new FileReader();

          reader.addEventListener("load", () => {
            $formData.Image = reader.result;
          });

          reader.readAsDataURL(file);
        }
      });
    }
  });

  export let data: any | SuperValidated<Infer<FormSchema>> =
    $page.data.checkboxMultiple;

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

  function addParentStatus(id: string) {
    $formData.Parent_Status = [...$formData.Parent_Status, id];
  }

  function removeParentStatus(id: string) {
    $formData.Parent_Status = $formData.Parent_Status.filter(
      (i: string) => i !== id,
    );
  }

  function addJHSType(id: string) {
    $formData.JHS_Type = [...$formData.JHS_Type, id];
  }

  function removeJHSType(id: string) {
    $formData.JHS_Type = $formData.JHS_Type.filter((i: string) => i !== id);
  }

  function addSHSType(id: string) {
    $formData.SHS_Type = [...$formData.SHS_Type, id];
  }

  function removeSHSType(id: string) {
    $formData.SHS_Type = $formData.SHS_Type.filter((i: string) => i !== id);
  }

  function addSourceIncome(id: string) {
    $formData.Source_of_Income = [...$formData.Source_of_Income, id];
  }

  function removeSourceIncome(id: string) {
    $formData.Source_of_Income = $formData.Source_of_Income.filter(
      (i: string) => i !== id,
    );
  }

  function addSourceAllowance(id: string) {
    $formData.Source_of_Allowance = [...$formData.Source_of_Allowance, id];
  }

  function removeSourceAllowance(id: string) {
    $formData.Source_of_Allowance = $formData.Source_of_Allowance.filter(
      (i: string) => i !== id,
    );
  }

  function addYesReason(id: string) {
    $formData.Yes_Reasons = [...$formData.Yes_Reasons, id];
  }

  function removeYesReason(id: string) {
    $formData.Yes_Reasons = $formData.Yes_Reasons.filter(
      (i: string) => i !== id,
    );
  }

  function addNoReason(id: string) {
    $formData.No_Reasons = [...$formData.No_Reasons, id];
  }

  function removeNoReason(id: string) {
    $formData.No_Reasons = $formData.No_Reasons.filter((i: string) => i !== id);
  }

  function addFuturePlan(id: string) {
    $formData.Future_Plans = [...$formData.Future_Plans, id];
  }

  function removeFuturePlan(id: string) {
    $formData.Future_Plans = $formData.Future_Plans.filter(
      (i: string) => i !== id,
    );
  }

  const parentStatuses = [
    {
      id: "Parents still married",
      label: "Parents still married",
    },
    {
      id: "Parents separated",
      label: "Parents separated",
    },
    {
      id: "Father re-married",
      label: "Father re-married",
    },
    {
      id: "Mother re-married",
      label: "Mother re-married",
    },
  ] as const;

  const jhsTypes = [
    {
      id: "City",
      label: "City",
    },
    {
      id: "National",
      label: "National",
    },
    {
      id: "Exclusive",
      label: "Exclusive",
    },
    {
      id: "Co-ed",
      label: "Co-ed",
    },
    {
      id: "Provincial",
      label: "Provincial",
    },
    {
      id: "Barangay",
      label: "Barangay",
    },
    {
      id: "Sectarian",
      label: "Sectarian",
    },
    {
      id: "Non-sectarian",
      label: "Non-sectarian",
    },
    {
      id: "Agricultural",
      label: "Agricultural",
    },
    {
      id: "Technical/Vocational",
      label: "Technical/Vocational",
    },
    {
      id: "Vocational/Technical",
      label: "Vocational/Technical",
    },
  ] as const;

  const shsTypes = [
    {
      id: "City",
      label: "City",
    },
    {
      id: "National",
      label: "National",
    },
    {
      id: "Exclusive",
      label: "Exclusive",
    },
    {
      id: "Co-ed",
      label: "Co-ed",
    },
    {
      id: "Provincial",
      label: "Provincial",
    },
    {
      id: "Barangay",
      label: "Barangay",
    },
    {
      id: "Sectarian",
      label: "Sectarian",
    },
    {
      id: "Non-sectarian",
      label: "Non-sectarian",
    },
    {
      id: "Agricultural",
      label: "Agricultural",
    },
    {
      id: "Technical/Vocational",
      label: "Technical/Vocational",
    },
    {
      id: "Vocational/Technical",
      label: "Vocational/Technical",
    },
  ] as const;

  const sourceIncomes = [
    {
      id: "None",
      label: "None",
    },
    {
      id: "Salaries/wages/commission",
      label: "Salaries/wages/commission",
    },
    {
      id: "Farming/fishing",
      label: "Farming/fishing",
    },
    {
      id: "Own business",
      label: "Own business",
    },
    {
      id: "Pension",
      label: "Pension",
    },
  ] as const;

  const sourceAllowances = [
    {
      id: "Parents and/or relatives",
      label: "Parents and/or relatives",
    },
    {
      id: "Study-now-pay-later plan",
      label: "Study-now-pay-later plan",
    },
    {
      id: "Student Assistantship",
      label: "Student Assistantship",
    },
    {
      id: "Scholarship/Fellowship (specify)",
      label: "Scholarship/Fellowship (specify)",
    },
    {
      id: "Part-time work outside of UP",
      label: "Part-time work outside of UP",
    },
    {
      id: "Savings from previous earnings",
      label: "Savings from previous earnings",
    },
    {
      id: "STFAP (specify bracket)",
      label: "STFAP (specify bracket)",
    },
    {
      id: "Other forms of financial aid from outside sources (e.g. private endowment)",
      label:
        "Other forms of financial aid from outside sources (e.g. private endowment)",
    },
  ] as const;

  const yesReasons = [
    {
      id: "N/A",
      label: "N/A",
    },
    {
      id: "It is my interest.",
      label: "It is my interest.",
    },
    {
      id: "There is a great opportunity to serve others.",
      label: "There is a great opportunity to serve others.",
    },
    {
      id: "I will be able to utilize my talents.",
      label: "I will be able to utilize my talents.",
    },
    {
      id: "There is a great demand for graduates of this course.",
      label: "There is a great demand for graduates of this course.",
    },
    {
      id: "Prospect of good salary after graduation.",
      label: "Prospect of good salary after graduations.",
    },
    {
      id: "It is prestigious.",
      label: "It is prestigious.",
    },
  ] as const;

  const noReasons = [
    {
      id: "N/A",
      label: "N/A",
    },
    {
      id: "Still undecided.",
      label: "Still undecided.",
    },
    {
      id: "It was my parents' or others' choice.",
      label: "It was my parents' or others' choice.",
    },
    {
      id: "The course I like is not offered in UP Baguio.",
      label: "The course I like is not offered in UP Baguio.",
    },
  ] as const;

  const futurePlans = [
    {
      id: "Work in hometown",
      label: "Work in hometown",
    },
    {
      id: "Work in private sector",
      label: "Work in private sector",
    },
    {
      id: "Work in the government",
      label: "Work in the government",
    },
    {
      id: "Work anywhere in the Philippines",
      label: "Work anywhere in the Philippines",
    },
    {
      id: "Work abroad",
      label: "Work abroad",
    },
    {
      id: "Pursue graduate studies in UP.",
      label: "Pursue graduate studies in UP.",
    },
    {
      id: "Pursue graduate studies abroad.",
      label: "Pursue graduate studies abroad.",
    },
    {
      id: "Pursue graduate studies in other school in PH.",
      label: "Pursue graduate studies in other school in PH.",
    },
    {
      id: "Set up own business/firm/private practice",
      label: "Set up own business/firm/private practice",
    },
  ] as const;

  const semesters = [
    { value: "first", label: "First Semester" },
    { value: "second", label: "Second Semester" },
    { value: "midyear", label: "Midyear" },
  ];

  const degprogs = [
    { value: "ba_comm", label: "Bachelor of Arts in Communication" },
    { value: "cert_fa", label: "Certificate in Fine Arts" },
    { value: "bfa", label: "Bachelor of Fine Arts" },
    { value: "ba_ll", label: "Bachelor of Arts in Language and Literature" },
    { value: "ma_ll", label: "Master of Arts in Language and Literature" },
    { value: "bs_bio", label: "Bachelor of Science in Biology" },
    { value: "bs_cmsc", label: "Bachelor of Science in Computer Science" },
    { value: "bs_math", label: "Bachelor of Science in Mathematics" },
    { value: "bs_phys", label: "Bachelor of Science in Physics" },
    {
      value: "ms_cre",
      label: "Master of Science in Conservation and Restoration Ecology",
    },
    { value: "ms_math", label: "Master of Science in Mathematics" },
    { value: "phd_math", label: "Ph.D. in Mathematics" },
    { value: "ba_ss", label: "Bachelor of Arts in Social Sciences" },
    { value: "bs_me", label: "Bachelor of Science in Management Economics" },
    { value: "mm", label: "Master of Management" },
    {
      value: "ma_sds",
      label: "Master of Arts in Social and Development Studies",
    },
  ];

  const colleges = [
    { value: "arts_and_comm", label: "College of Arts and Communication" },
    { value: "science", label: "College of Science" },
    { value: "social_sciences", label: "College of Social Sciences" },
  ];

  const sexes = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ];

  const nationalities = [
    { value: "Filipino", label: "Filipino" },
    { value: "American", label: "American" },
    { value: "Australian", label: "Australian" },
    { value: "Canadian", label: "Canadian" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
  ];

  //add more options
  const religions = [
    { value: "Buddhism", label: "Buddhism" },
    { value: "Judaism", label: "Judaism" },
    { value: "Hinduism", label: "Hinduism" },
    { value: "Islam", label: "Islam" },
    { value: "Catholic", label: "Catholic" },
    { value: "Iglesia ni Cristo", label: "Iglesia ni Cristo" },
    {
      value: "Philippine Independent Church",
      label: "Philippine Independent Church",
    },
  ];

  const lifeStatuses = [
    { value: "living", label: "Living" },
    { value: "deceased", label: "Deceased" },
  ];

  const educations = [
    { value: "elem", label: "Elementary Graduate" },
    { value: "hs", label: "High School Graduate" },
    { value: "college", label: "College Graduate" },
    { value: "ma", label: "Master's Graduate" },
    { value: "phd", label: "Doctorate's Graduate" },
    { value: "voc", label: "Vocational" },
  ];

  const hsRanks = [
    { value: "upper 25%", label: "Upper 25%" },
    { value: "average", label: "Average" },
    { value: "lower 25%", label: "Lower 25%" },
  ];

  const schoolAves = [
    { value: "95-100", label: "95-100" },
    { value: "90-94", label: "90-94" },
    { value: "85-89", label: "85-89" },
    { value: "80-84", label: "80-84" },
    { value: "75-79", label: "75-79" },
  ];

  const honors = [
    { value: "valedictorian", label: "Valedictorian" },
    { value: "salutatorian", label: "Salutatorian" },
    { value: "honorable mention", label: "Honorable Mention" },
  ];

  const numStuds = [
    { value: "less than 25", label: "Less than 25" },
    { value: "25-99", label: "25-99" },
    { value: "100-199", label: "100-199" },
    { value: "200-399", label: "200-399" },
    { value: "400-599", label: "400-599" },
    { value: "600 or more", label: "600 or more" },
  ];

  const campuses = [
    { value: "upd", label: "UP Diliman" },
    { value: "uplb", label: "UP Los Banos" },
    { value: "upb", label: "UP Baguio" },
    { value: "upou", label: "UP Open University" },
    { value: "upv", label: "UP Visayas" },
    { value: "upc", label: "UP Cebu" },
    { value: "upt", label: "UP Tacloban" },
    { value: "upm", label: "UP Mindanao" },
  ];

  const incomes = [
    { value: "less than 10,000", label: "less than 10,000" },
    { value: "10,001 - 20,000", label: "10,001 - 20,000" },
    { value: "20,001 - 30,000", label: "20,001 - 30,000" },
    { value: "30,001 - 40,000", label: "30,001 - 40,000" },
    { value: "40,001 - 45,000", label: "40,001 - 45,000" },
    { value: "45,001 - 50,000", label: "45,001 - 50,000" },
    { value: "50,001 - 55,000", label: "50,001 - 55,000" },
    { value: "55,001 - 60,000", label: "55,001 - 60,000" },
    { value: "60,000 - above", label: "60,000 - above" },
  ];

  const yesOrNos = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const majors = [
    { value: "none", label: "N/A" },
    { value: "Economics", label: "Economics" },
    { value: "History", label: "History" },
    { value: "Anthropology", label: "Anthropology" },
  ];

  $: selectedSem = $formData.Sem
    ? {
        label: $formData.SemLabel,
        value: $formData.Sem,
      }
    : undefined;

  $: selectedDegProg = $formData.DegProg
    ? {
        label: $formData.DegProgLabel,
        value: $formData.DegProg,
      }
    : undefined;

  $: selectedCollege = $formData.College
    ? {
        label: $formData.CollegeLabel,
        value: $formData.College,
      }
    : undefined;

  $: selectedStudentSex = $formData.StudentSex
    ? {
        label: $formData.StudentSexLabel,
        value: $formData.StudentSex,
      }
    : undefined;

  $: selectedNationality = $formData.Nationality
    ? {
        label: $formData.NationalityLabel,
        value: $formData.Nationality,
      }
    : undefined;

  $: selectedCitizenship = $formData.Citizenship
    ? {
        label: $formData.CitizenshipLabel,
        value: $formData.Citizenship,
      }
    : undefined;

  $: selectedReligion = $formData.Religion
    ? {
        label: $formData.ReligionLabel,
        value: $formData.Religion,
      }
    : undefined;

  $: selectedFatherLifeStatus = $formData.FatherLifeStatus
    ? {
        label: $formData.FatherLifeStatusLabel,
        value: $formData.FatherLifeStatus,
      }
    : undefined;

  $: selectedFatherReligion = $formData.FatherReligion
    ? {
        label: $formData.FatherReligionLabel,
        value: $formData.FatherReligion,
      }
    : undefined;

  $: selectedFatherHighestDegree = $formData.FatherHighestDegree
    ? {
        label: $formData.FatherHighestDegreeLabel,
        value: $formData.FatherHighestDegree,
      }
    : undefined;

  $: selectedMotherLifeStatus = $formData.MotherLifeStatus
    ? {
        label: $formData.MotherLifeStatusLabel,
        value: $formData.MotherLifeStatus,
      }
    : undefined;

  $: selectedMotherReligion = $formData.MotherReligion
    ? {
        label: $formData.MotherReligionLabel,
        value: $formData.MotherReligion,
      }
    : undefined;

  $: selectedMotherHighestDegree = $formData.MotherHighestDegree
    ? {
        label: $formData.MotherHighestDegreeLabel,
        value: $formData.MotherHighestDegree,
      }
    : undefined;

  $: selectedHSrank = $formData.HSrank
    ? {
        label: $formData.HSrankLabel,
        value: $formData.HSrank,
      }
    : undefined;

  $: selectedSchoolAve = $formData.SchoolAve
    ? {
        label: $formData.SchoolAveLabel,
        value: $formData.SchoolAve,
      }
    : undefined;

  $: selectedHonor = $formData.Honor
    ? {
        label: $formData.HonorLabel,
        value: $formData.Honor,
      }
    : undefined;

  $: selectedJHSNumStud = $formData.JHSNumStud
    ? {
        label: $formData.JHSNumStudLabel,
        value: $formData.JHSNumStud,
      }
    : undefined;

  $: selectedSHSNumStud = $formData.SHSNumStud
    ? {
        label: $formData.SHSNumStudLabel,
        value: $formData.SHSNumStud,
      }
    : undefined;

  $: selectedFirstCampus = $formData.FirstCampus
    ? {
        label: $formData.FirstCampusLabel,
        value: $formData.FirstCampus,
      }
    : undefined;

  $: selectedSecondCampus = $formData.SecondCampus
    ? {
        label: $formData.SecondCampusLabel,
        value: $formData.SecondCampus,
      }
    : undefined;

  $: selectedIncome = $formData.Income
    ? {
        label: $formData.IncomeLabel,
        value: $formData.Income,
      }
    : undefined;

  $: selectedFinishInUPBYN = $formData.FinishInUPBYN
    ? {
        label: $formData.FinishInUPBYNLabel,
        value: $formData.FinishInUPBYN,
      }
    : undefined;

  $: selectedCourse = $formData.Course
    ? {
        label: $formData.CourseLabel,
        value: $formData.Course,
      }
    : undefined;

  $: selectedMajor = $formData.Major
    ? {
        label: $formData.MajorLabel,
        value: $formData.Major,
      }
    : undefined;

  $: selectedSatisfactionYN = $formData.satisfactionYN
    ? {
        label: $formData.satisfactionYNLabel,
        value: $formData.satisfactionYN,
      }
    : undefined;

  $: selectedReadingYN = $formData.readingYN
    ? {
        label: $formData.readingYNLabel,
        value: $formData.readingYN,
      }
    : undefined;

  let children = [
    {
      cName: "",
      cSex: "",
      cAge: "",
      cCivil_Status: "",
      cEducational_Attainment: "",
      cOccupation: "",
      cResidence: "",
    },
  ];

  const addChild = () => {
    children = [
      ...children,
      {
        cName: "",
        cSex: "",
        cAge: "",
        cCivil_Status: "",
        cEducational_Attainment: "",
        cOccupation: "",
        cResidence: "",
      },
    ];
  };
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
      <h1>Preliminaries</h1>

      <div class="md:grid md:grid-cols-2 md:gap-4">
        <Form.Field {form} name="Semester">
          <Form.Control let:attrs>
            <Form.Label>Semester</Form.Label>
            <Select.Root
              selected={selectedSem}
              onSelectedChange={(v) => {
                v &&
                  ($formData.Sem = v.value) &&
                  ($formData.SemLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select a semester." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each semesters as semester}
                    <Select.Item value={semester.value} label={semester.label}
                      >{semester.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.Sem} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="School_Year">
          <Form.Control let:attrs>
            <Form.Label>School Year</Form.Label>
            <Input
              {...attrs}
              placeholder="20XX-20XX"
              bind:value={$formData.School_Year}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Student_Number">
          <Form.Control let:attrs>
            <Form.Label>Student Number</Form.Label>
            <Input
              {...attrs}
              placeholder="20XXXXXXX"
              bind:value={$formData.Student_Number}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Degree_Program">
          <Form.Control let:attrs>
            <Form.Label>Course/Degree Program</Form.Label>
            <Select.Root
              selected={selectedDegProg}
              onSelectedChange={(v) => {
                v &&
                  ($formData.DegProg = v.value) &&
                  ($formData.DegProgLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select a course/degree program." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each degprogs as degprog}
                    <Select.Item value={degprog.value} label={degprog.label}
                      >{degprog.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.DegProg} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Form.Field {form} name="College">
        <Form.Control let:attrs>
          <Form.Label>College</Form.Label>
          <Select.Root
            selected={selectedCollege}
            onSelectedChange={(v) => {
              v &&
                ($formData.College = v.value) &&
                ($formData.CollegeLabel = v.label);
            }}
          >
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Select a college." />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each colleges as college}
                  <Select.Item value={college.value} label={college.label}
                    >{college.label}</Select.Item
                  >
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <input hidden bind:value={$formData.College} name={attrs.name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </div>

    <div
      class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
    >
      <h1>Personal Information</h1>
      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Student_Name">
          <Form.Control let:attrs>
            <Form.Label>Name</Form.Label>
            <Input
              {...attrs}
              placeholder="Surname, First Name, Middle Name"
              bind:value={$formData.Student_Name}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Nickname">
          <Form.Control let:attrs>
            <Form.Label>Nickname</Form.Label>
            <Input
              {...attrs}
              placeholder="Nickname"
              bind:value={$formData.Nickname}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Student_Sex">
          <Form.Control let:attrs>
            <Form.Label>Sex</Form.Label>
            <Select.Root
              selected={selectedStudentSex}
              onSelectedChange={(v) => {
                v &&
                  ($formData.StudentSex = v.value) &&
                  ($formData.StudentSexLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your sex." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each sexes as sex}
                    <Select.Item value={sex.value} label={sex.label}
                      >{sex.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.StudentSex} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Student_Age">
          <Form.Control let:attrs>
            <Form.Label>Age</Form.Label>
            <Input
              {...attrs}
              placeholder="XX"
              bind:value={$formData.StudentAge}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Birth_Date">
          <Form.Control let:attrs>
            <Form.Label>Date of Birth</Form.Label>
            <Input
              {...attrs}
              placeholder="MM-DD-YYYY"
              bind:value={$formData.Birth_Date}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Place_Of_Birth">
          <Form.Control let:attrs>
            <Form.Label>Place of Birth</Form.Label>
            <Input
              {...attrs}
              placeholder="Place of Birth"
              bind:value={$formData.Place_Of_Birth}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <div class="gap-4 md:grid md:grid-cols-3">
        <Form.Field {form} name="Nationality">
          <Form.Control let:attrs>
            <Form.Label>Nationality</Form.Label>
            <Select.Root
              selected={selectedNationality}
              onSelectedChange={(v) => {
                v &&
                  ($formData.Nationality = v.value) &&
                  ($formData.NationalityLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your nationality." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each nationalities as nationality}
                    <Select.Item
                      value={nationality.value}
                      label={nationality.label}>{nationality.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input
              hidden
              bind:value={$formData.Nationality}
              name={attrs.name}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Citizenship">
          <Form.Control let:attrs>
            <Form.Label>Citizenship</Form.Label>
            <Select.Root
              selected={selectedCitizenship}
              onSelectedChange={(v) => {
                v &&
                  ($formData.Citizenship = v.value) &&
                  ($formData.CitizenshipLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your citizenship." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each nationalities as nationality}
                    <Select.Item
                      value={nationality.value}
                      label={nationality.label}>{nationality.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input
              hidden
              bind:value={$formData.Citizenship}
              name={attrs.name}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Religion">
          <Form.Control let:attrs>
            <Form.Label>Religion</Form.Label>
            <Select.Root
              selected={selectedReligion}
              onSelectedChange={(v) => {
                v &&
                  ($formData.Religion = v.value) &&
                  ($formData.ReligionLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your religion." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each religions as religion}
                    <Select.Item value={religion.value} label={religion.label}
                      >{religion.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.Religion} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Cellphone_Number">
          <Form.Control let:attrs>
            <Form.Label>Cellphone Number</Form.Label>
            <Input
              {...attrs}
              placeholder="09XXXXXXXXX"
              bind:value={$formData.Cellphone_Number}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Email_Address">
          <Form.Control let:attrs>
            <Form.Label>Email Address</Form.Label>
            <Input
              {...attrs}
              placeholder="Email Address"
              bind:value={$formData.Email_Address}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Baguio_Address">
          <Form.Control let:attrs>
            <Form.Label>Address While In UP Baguio</Form.Label>
            <Input
              {...attrs}
              placeholder="Baguio Address"
              bind:value={$formData.Baguio_Address}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Baguio_Telephone_Number">
          <Form.Control let:attrs>
            <Form.Label>Telephone Number</Form.Label>
            <Input
              {...attrs}
              placeholder="Telephone Number of Baguio Residence"
              bind:value={$formData.Baguio_Telephone_Number}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Permanent_Address">
          <Form.Control let:attrs>
            <Form.Label>Permanent Home Address</Form.Label>
            <Input
              {...attrs}
              placeholder="Permanent Home Address"
              bind:value={$formData.Permanent_Address}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Permanent_Telephone_Number">
          <Form.Control let:attrs>
            <Form.Label>Telephone Number</Form.Label>
            <Input
              {...attrs}
              placeholder="Telephone Number of Permanent Residence"
              bind:value={$formData.Permanent_Telephone_Number}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
    </div>

    <div
      class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
    >
      <h1>Family Data</h1>

      <Form.Fieldset {form} name="Parent_Status">
        <div class="mb-4">
          <Form.Legend
            >Check any of the following that is applicable.</Form.Legend
          >
        </div>
        <div class="gap-4 md:grid md:grid-cols-4">
          {#each parentStatuses as parentStatus}
            {@const checked = $formData.Parent_Status.includes(parentStatus.id)}
            <div
              style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
            >
              <Form.Control let:attrs>
                <Checkbox
                  {...attrs}
                  {checked}
                  onCheckedChange={(v) => {
                    if (v) {
                      addParentStatus(parentStatus.id);
                    } else {
                      removeParentStatus(parentStatus.id);
                    }
                  }}
                />
                <Form.Label class="ml-2 font-normal">
                  {parentStatus.label}
                </Form.Label>
                <input
                  hidden
                  type="checkbox"
                  name={attrs.name}
                  value={parentStatus.id}
                  {checked}
                />
              </Form.Control>
            </div>
          {/each}
          <Form.FieldErrors />
        </div>
      </Form.Fieldset>

      <div class="gap-4 md:grid md:grid-cols-3">
        <Form.Field {form} name="Guardian">
          <Form.Control let:attrs>
            <Form.Label>Guardian (if not living with parents)</Form.Label>
            <Input {...attrs} placeholder="" bind:value={$formData.Guardian} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Guardian_Address">
          <Form.Control let:attrs>
            <Form.Label>Address</Form.Label>
            <Input
              {...attrs}
              placeholder=""
              bind:value={$formData.Guardian_Address}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Guardian_Telephone_Number">
          <Form.Control let:attrs>
            <Form.Label>Telephone Number</Form.Label>
            <Input
              {...attrs}
              placeholder=""
              bind:value={$formData.Guardian_Telephone_Number}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <hr />
      <div class="grid grid-cols-2 gap-4">
        <div
          class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
        >
          FATHER
        </div>
        <div
          class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
        >
          MOTHER
        </div>

        <div>
          <Form.Field {form} name="Father_Name">
            <Form.Control let:attrs>
              <Form.Label>Name</Form.Label>
              <Input
                {...attrs}
                placeholder="Name of Father"
                bind:value={$formData.Father_Name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="XX"
                bind:value={$formData.FatherAge}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Living_Or_Dead">
            <Form.Control let:attrs>
              <Form.Label>Living or Deceased</Form.Label>
              <Select.Root
                selected={selectedFatherLifeStatus}
                onSelectedChange={(v) => {
                  v &&
                    ($formData.FatherLifeStatus = v.value) &&
                    ($formData.FatherLifeStatusLabel = v.label);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select a status." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each lifeStatuses as lifeStatus}
                      <Select.Item
                        value={lifeStatus.value}
                        label={lifeStatus.label}>{lifeStatus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input
                hidden
                bind:value={$formData.FatherLifeStatus}
                name={attrs.name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Place_Of_Birth">
            <Form.Control let:attrs>
              <Form.Label>Birthplace</Form.Label>
              <Input
                {...attrs}
                placeholder="Birthplace"
                bind:value={$formData.Father_Place_Of_Birth}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Address">
            <Form.Control let:attrs>
              <Form.Label>Address</Form.Label>
              <Input
                {...attrs}
                placeholder="Address"
                bind:value={$formData.FatherAddress}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Contact_Number">
            <Form.Control let:attrs>
              <Form.Label>Contact Number</Form.Label>
              <Input
                {...attrs}
                placeholder="09XXXXXXXXX"
                bind:value={$formData.Father_Contact_Number}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Religion">
            <Form.Control let:attrs>
              <Form.Label>Religion</Form.Label>
              <Select.Root
                selected={selectedFatherReligion}
                onSelectedChange={(v) => {
                  v &&
                    ($formData.FatherReligion = v.value) &&
                    ($formData.FatherReligionLabel = v.label);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select your father's religion." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each religions as religion}
                      <Select.Item value={religion.value} label={religion.label}
                        >{religion.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input
                hidden
                bind:value={$formData.FatherReligion}
                name={attrs.name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Occupation">
            <Form.Control let:attrs>
              <Form.Label>Occupation</Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={$formData.FatherOccupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Monthly_Income">
            <Form.Control let:attrs>
              <Form.Label>Monthly Income</Form.Label>
              <Input
                {...attrs}
                placeholder="Monthly Income"
                bind:value={$formData.Father_Monthly_Income}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Employer_Name">
            <Form.Control let:attrs>
              <Form.Label>Name of Employer</Form.Label>
              <Input
                {...attrs}
                placeholder="Name of Employer"
                bind:value={$formData.Father_Employer_Name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Employer_Address">
            <Form.Control let:attrs>
              <Form.Label>Address of Employer</Form.Label>
              <Input
                {...attrs}
                placeholder="Address of Employer"
                bind:value={$formData.Father_Employer_Address}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Highest_Degree_Completed">
            <Form.Control let:attrs>
              <Form.Label>Highest Grade/Degree Completed</Form.Label>
              <Select.Root
                selected={selectedFatherHighestDegree}
                onSelectedChange={(v) => {
                  v &&
                    ($formData.FatherHighestDegree = v.value) &&
                    ($formData.FatherHighestDegreeLabel = v.label);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select an option." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each educations as education}
                      <Select.Item
                        value={education.value}
                        label={education.label}>{education.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input
                hidden
                bind:value={$formData.FatherHighestDegree}
                name={attrs.name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_School">
            <Form.Control let:attrs>
              <Form.Label>School or College</Form.Label>
              <Input
                {...attrs}
                placeholder="School or College"
                bind:value={$formData.Father_School}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Father_Languages">
            <Form.Control let:attrs>
              <Form.Label>Dialects/Languages spoken at home</Form.Label>
              <Input
                {...attrs}
                placeholder="Dialects (ex. Bisaya, Ilocano) or Languages (ex. Filipino, English)"
                bind:value={$formData.Father_Languages}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
        <div>
          <Form.Field {form} name="Mother_Name">
            <Form.Control let:attrs>
              <Form.Label>Name</Form.Label>
              <Input
                {...attrs}
                placeholder="Name of Mother"
                bind:value={$formData.Mother_Name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Age">
            <Form.Control let:attrs>
              <Form.Label>Age</Form.Label>
              <Input
                {...attrs}
                placeholder="XX"
                bind:value={$formData.MotherAge}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Living_Or_Dead">
            <Form.Control let:attrs>
              <Form.Label>Living or Deceased</Form.Label>
              <Select.Root
                selected={selectedMotherLifeStatus}
                onSelectedChange={(v) => {
                  v &&
                    ($formData.MotherLifeStatus = v.value) &&
                    ($formData.MotherLifeStatusLabel = v.label);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select a status." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each lifeStatuses as lifeStatus}
                      <Select.Item
                        value={lifeStatus.value}
                        label={lifeStatus.label}>{lifeStatus.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input
                hidden
                bind:value={$formData.MotherLifeStatus}
                name={attrs.name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Place_Of_Birth">
            <Form.Control let:attrs>
              <Form.Label>Birthplace</Form.Label>
              <Input
                {...attrs}
                placeholder="Birthplace"
                bind:value={$formData.Mother_Place_Of_Birth}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Address">
            <Form.Control let:attrs>
              <Form.Label>Address</Form.Label>
              <Input
                {...attrs}
                placeholder="Address"
                bind:value={$formData.Mother_Address}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Contact_Number">
            <Form.Control let:attrs>
              <Form.Label>Contact Number</Form.Label>
              <Input
                {...attrs}
                placeholder="09XXXXXXXXX"
                bind:value={$formData.Mother_Contact_Number}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Religion">
            <Form.Control let:attrs>
              <Form.Label>Religion</Form.Label>
              <Select.Root
                selected={selectedMotherReligion}
                onSelectedChange={(v) => {
                  v &&
                    ($formData.MotherReligion = v.value) &&
                    ($formData.MotherReligionLabel = v.label);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select your mother's religion." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each religions as religion}
                      <Select.Item value={religion.value} label={religion.label}
                        >{religion.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input
                hidden
                bind:value={$formData.MotherReligion}
                name={attrs.name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Occupation">
            <Form.Control let:attrs>
              <Form.Label>Occupation</Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={$formData.Mother_Occupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Monthly_Income">
            <Form.Control let:attrs>
              <Form.Label>Monthly Income</Form.Label>
              <Input
                {...attrs}
                placeholder="Monthly Income"
                bind:value={$formData.Mother_Monthly_Income}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Employer_Name">
            <Form.Control let:attrs>
              <Form.Label>Name of Employer</Form.Label>
              <Input
                {...attrs}
                placeholder="Name of Employer"
                bind:value={$formData.Mother_Employer_Name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Employer_Address">
            <Form.Control let:attrs>
              <Form.Label>Address of Employer</Form.Label>
              <Input
                {...attrs}
                placeholder="Address of Employer"
                bind:value={$formData.Employer_Address}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_Highest_Degree_Completed">
            <Form.Control let:attrs>
              <Form.Label>Highest Grade/Degree Completed</Form.Label>
              <Select.Root
                selected={selectedMotherHighestDegree}
                onSelectedChange={(v) => {
                  v &&
                    ($formData.MotherHighestDegree = v.value) &&
                    ($formData.MotherHighestDegreeLabel = v.label);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select an option." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each educations as education}
                      <Select.Item
                        value={education.value}
                        label={education.label}>{education.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input
                hidden
                bind:value={$formData.MotherHighestDegree}
                name={attrs.name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Mother_School">
            <Form.Control let:attrs>
              <Form.Label>School or College</Form.Label>
              <Input
                {...attrs}
                placeholder="School or College"
                bind:value={$formData.Mother_School}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <!-- pwedeng drop down but multiple languages/dialects could be selected -->

          <Form.Field {form} name="Mother_Languages">
            <Form.Control let:attrs>
              <Form.Label>Dialects/Languages spoken at home</Form.Label>
              <Input
                {...attrs}
                placeholder="Dialects (ex. Bisaya, Ilocano) or Languages (ex. Filipino, English)"
                bind:value={$formData.Mother_Languages}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>
    </div>

    <div
      class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
    >
      <h1>Children in the Family</h1>
      <h3>
        <center
          ><em>From eldest to youngest; put an asterisk (*) after your name</em
          ></center
        >
      </h3>
      <div class="gap-2 md:grid md:grid-cols-7">
        <div
          class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
        >
          NAME
        </div>
        <div
          class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
        >
          SEX
        </div>
        <div
          class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
        >
          AGE
        </div>
        <div
          class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
        >
          CIVIL STATUS
        </div>
        <div
          class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
        >
          EDUCATIONAL ATTAINMENT
        </div>
        <div
          class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
        >
          OCCUPATION
        </div>
        <div
          class="text-medium flex items-center justify-center rounded-sm bg-rose-900 p-2 text-center text-white"
        >
          RESIDENCE
        </div>

        {#each children as child}
          <Form.Field {form} name="Name">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="Name" bind:value={child.cName} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Sex">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="Sex" bind:value={child.cSex} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Age">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input {...attrs} placeholder="XX" bind:value={child.cAge} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Civil_Status">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Civil Status"
                bind:value={child.cCivil_Status}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Educational_Attainment">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Educational Attainment"
                bind:value={child.cEducational_Attainment}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Occupation">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Occupation"
                bind:value={child.cOccupation}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Residence">
            <Form.Control let:attrs>
              <Form.Label></Form.Label>
              <Input
                {...attrs}
                placeholder="Residence"
                bind:value={child.cResidence}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        {/each}

        <Button on:click={addChild} class="w-full">Add</Button>
      </div>
    </div>

    <div
      class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
    >
      <h1>Educational Background</h1>
      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Elementary_School">
          <Form.Control let:attrs>
            <Form.Label>Elementary School</Form.Label>
            <Input
              {...attrs}
              placeholder="Name of School"
              bind:value={$formData.Elementary_School}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Elementary_School_Location">
          <Form.Control let:attrs>
            <Form.Label>Location</Form.Label>
            <Input
              {...attrs}
              placeholder="Location of Elementary School"
              bind:value={$formData.Elementary_School_Location}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <hr />
      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Junior_High_School">
          <Form.Control let:attrs>
            <Form.Label>Junior High School</Form.Label>
            <Input
              {...attrs}
              placeholder="Name of Junior High School"
              bind:value={$formData.Junior_High_School}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Junior_High_School_Location">
          <Form.Control let:attrs>
            <Form.Label>Location</Form.Label>
            <Input
              {...attrs}
              placeholder="Location of Junior High School"
              bind:value={$formData.Junior_High_School_Location}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Form.Fieldset {form} name="JHS_Type">
        <div class="mb-4">
          <Form.Legend>Type of Junior High School</Form.Legend>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div
            class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
          >
            PUBLIC
          </div>
          <div
            class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
          >
            PRIVATE
          </div>
        </div>

        <div class="gap-4 md:grid md:grid-cols-4">
          {#each jhsTypes as jhsType}
            {@const checked = $formData.JHS_Type.includes(jhsType.id)}
            <div
              style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
            >
              <Form.Control let:attrs>
                <Checkbox
                  {...attrs}
                  {checked}
                  onCheckedChange={(v) => {
                    if (v) {
                      addJHSType(jhsType.id);
                    } else {
                      removeJHSType(jhsType.id);
                    }
                  }}
                />
                <Form.Label class="ml-2 font-normal">
                  {jhsType.label}
                </Form.Label>
                <input
                  hidden
                  type="checkbox"
                  name={attrs.name}
                  value={jhsType.id}
                  {checked}
                />
              </Form.Control>
            </div>
          {/each}
          <Form.FieldErrors />
        </div>
      </Form.Fieldset>

      <Form.Field {form} name="Junior_Number_Of_Students">
        <Form.Control let:attrs>
          <Form.Label
            >The number of students in my Junior High School graduating class
            was:</Form.Label
          >
          <Select.Root
            selected={selectedJHSNumStud}
            onSelectedChange={(v) => {
              v &&
                ($formData.JHSNumStud = v.value) &&
                ($formData.JHSNumStudLabel = v.label);
            }}
          >
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Select an option." />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each numStuds as numStud}
                  <Select.Item value={numStud.value} label={numStud.label}
                    >{numStud.label}</Select.Item
                  >
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <input hidden bind:value={$formData.JHSNumStud} name={attrs.name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <hr />
      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Senior_High_School">
          <Form.Control let:attrs>
            <Form.Label>Senior High School</Form.Label>
            <Input
              {...attrs}
              placeholder="Name of Senior High School"
              bind:value={$formData.Senior_High_School}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Senior_High_School_Location">
          <Form.Control let:attrs>
            <Form.Label>Location</Form.Label>
            <Input
              {...attrs}
              placeholder="Location of Senior High School"
              bind:value={$formData.Senior_High_School_Location}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Form.Fieldset {form} name="SHS_Type">
        <div class="mb-4">
          <Form.Legend>Type of Senior High School</Form.Legend>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div
            class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
          >
            PUBLIC
          </div>
          <div
            class="text-medium rounded-sm bg-rose-900 text-center text-xl text-white"
          >
            PRIVATE
          </div>
        </div>

        <div class="gap-4 md:grid md:grid-cols-4">
          {#each shsTypes as shsType}
            {@const checked = $formData.SHS_Type.includes(shsType.id)}
            <div
              style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
            >
              <Form.Control let:attrs>
                <Checkbox
                  {...attrs}
                  {checked}
                  onCheckedChange={(v) => {
                    if (v) {
                      addSHSType(shsType.id);
                    } else {
                      removeSHSType(shsType.id);
                    }
                  }}
                />
                <Form.Label class="ml-2 font-normal">
                  {shsType.label}
                </Form.Label>
                <input
                  hidden
                  type="checkbox"
                  name={attrs.name}
                  value={shsType.id}
                  {checked}
                />
              </Form.Control>
            </div>
          {/each}
          <Form.FieldErrors />
        </div>
      </Form.Fieldset>

      <Form.Field {form} name="Senior_Number_Of_Students">
        <Form.Control let:attrs>
          <Form.Label
            >The number of students in my Senior High School graduating class
            was:</Form.Label
          >
          <Select.Root
            selected={selectedSHSNumStud}
            onSelectedChange={(v) => {
              v &&
                ($formData.SHSNumStud = v.value) &&
                ($formData.SHSNumStudLabel = v.label);
            }}
          >
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Select an option." />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each numStuds as numStud}
                  <Select.Item value={numStud.value} label={numStud.label}
                    >{numStud.label}</Select.Item
                  >
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <input hidden bind:value={$formData.SHSNumStud} name={attrs.name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <hr />
      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="HS_Rank">
          <Form.Control let:attrs>
            <Form.Label
              >My rank in High School was (if not sure, give your best
              estimate):</Form.Label
            >
            <Select.Root
              selected={selectedHSrank}
              onSelectedChange={(v) => {
                v &&
                  ($formData.HSrank = v.value) &&
                  ($formData.HSrankLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select an option." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each hsRanks as hsRank}
                    <Select.Item value={hsRank.value} label={hsRank.label}
                      >{hsRank.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.HSrank} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="School_Ave">
          <Form.Control let:attrs>
            <Form.Label>My overall school average was:</Form.Label>
            <Select.Root
              selected={selectedSchoolAve}
              onSelectedChange={(v) => {
                v &&
                  ($formData.SchoolAve = v.value) &&
                  ($formData.SchoolAveLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select an option." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each schoolAves as schoolAve}
                    <Select.Item value={schoolAve.value} label={schoolAve.label}
                      >{schoolAve.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.SchoolAve} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Honors">
          <Form.Control let:attrs>
            <Form.Label>Honors Received:</Form.Label>
            <Select.Root
              selected={selectedHonor}
              onSelectedChange={(v) => {
                v &&
                  ($formData.Honor = v.value) &&
                  ($formData.HonorLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select an option." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each honors as honor}
                    <Select.Item value={honor.value} label={honor.label}
                      >{honor.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.Honor} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Awards">
          <Form.Control let:attrs>
            <Form.Label>Other Awards/Honors Received:</Form.Label>
            <Input
              {...attrs}
              placeholder="Awards/Honors"
              bind:value={$formData.Awards}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
      <hr />
      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="First_Campus">
          <Form.Control let:attrs>
            <Form.Label>First Choice of Campus</Form.Label>
            <Select.Root
              selected={selectedFirstCampus}
              onSelectedChange={(v) => {
                v &&
                  ($formData.FirstCampus = v.value) &&
                  ($formData.FirstCampusLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your first choice." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each campuses as campus}
                    <Select.Item value={campus.value} label={campus.label}
                      >{campus.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input
              hidden
              bind:value={$formData.FirstCampus}
              name={attrs.name}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="First_Campus_Reason">
          <Form.Control let:attrs>
            <Form.Label>Reason/s</Form.Label>
            <Input
              {...attrs}
              placeholder="Reason/s"
              bind:value={$formData.FReason}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Second_Campus">
          <Form.Control let:attrs>
            <Form.Label>Second Choice of Campus</Form.Label>
            <Select.Root
              selected={selectedSecondCampus}
              onSelectedChange={(v) => {
                v &&
                  ($formData.SecondCampus = v.value) &&
                  ($formData.SecondCampusLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your second choice." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each campuses as campus}
                    <Select.Item value={campus.value} label={campus.label}
                      >{campus.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input
              hidden
              bind:value={$formData.SecondCampus}
              name={attrs.name}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Second_Campus_Reason">
          <Form.Control let:attrs>
            <Form.Label>Reason/s</Form.Label>
            <Input
              {...attrs}
              placeholder="Reason/s"
              bind:value={$formData.SReason}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
    </div>

    <div
      class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
    >
      <h1>Financial Information</h1>
      <p class="mb-4">
        To plan financial programs for entering students, schools need to know
        the financial background of their students. Please estimate as
        accurately as you can your family's <b>MONTHLY</b> income.
      </p>

      <Form.Field {form} name="Income">
        <Form.Control let:attrs>
          <Form.Label>Family's Monthly Income</Form.Label>
          <Select.Root
            selected={selectedIncome}
            onSelectedChange={(v) => {
              v &&
                ($formData.Income = v.value) &&
                ($formData.IncomeLabel = v.label);
            }}
          >
            <Select.Trigger {...attrs}>
              <Select.Value
                placeholder="Select your family's monthly income."
              />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each incomes as income}
                  <Select.Item value={income.value} label={income.label}
                    >{income.label}</Select.Item
                  >
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <input hidden bind:value={$formData.Income} name={attrs.name} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Fieldset {form} name="Source_of_Income">
        <div class="mb-4">
          <Form.Legend
            >What is/are the source/s of your family's income? (Check as many
            that applies).</Form.Legend
          >
        </div>
        <div class="gap-4 md:grid md:grid-cols-3">
          {#each sourceIncomes as sourceIncome}
            {@const checked = $formData.Source_of_Income.includes(
              sourceIncome.id,
            )}
            <div
              style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
            >
              <Form.Control let:attrs>
                <Checkbox
                  {...attrs}
                  {checked}
                  onCheckedChange={(v) => {
                    if (v) {
                      addSourceIncome(sourceIncome.id);
                    } else {
                      removeSourceIncome(sourceIncome.id);
                    }
                  }}
                />
                <Form.Label class="ml-2 font-normal">
                  {sourceIncome.label}
                </Form.Label>
                <input
                  hidden
                  type="checkbox"
                  name={attrs.name}
                  value={sourceIncome.id}
                  {checked}
                />
              </Form.Control>
            </div>
          {/each}
          <Form.FieldErrors />
        </div>
      </Form.Fieldset>

      <Form.Field {form} name="Other_Sources_Of_Income">
        <Form.Control let:attrs>
          <Form.Label
            >Other sources of income of your family that was not stated above.
            Please type <b>N/A</b>, if not applicable.</Form.Label
          >
          <Input
            {...attrs}
            placeholder=""
            bind:value={$formData.other_sources}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="Allowance">
        <Form.Control let:attrs>
          <Form.Label
            >Indicate the allowance you expect to receive <b
              >monthly (EXCLUDING</b
            > board & lodging)
          </Form.Label>
          <Input {...attrs} placeholder="" bind:value={$formData.Allowance} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Fieldset {form} name="Source_of_Allowance">
        <div class="mb-4">
          <Form.Legend>Check below the source/s of your allowances</Form.Legend>
        </div>
        <div class="gap-4 md:grid md:grid-cols-2">
          {#each sourceAllowances as sourceAllowance}
            {@const checked = $formData.Source_of_Allowance.includes(
              sourceAllowance.id,
            )}
            <div
              style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
            >
              <Form.Control let:attrs>
                <Checkbox
                  {...attrs}
                  {checked}
                  onCheckedChange={(v) => {
                    if (v) {
                      addSourceAllowance(sourceAllowance.id);
                    } else {
                      removeSourceAllowance(sourceAllowance.id);
                    }
                  }}
                />
                <Form.Label class="ml-2 font-normal">
                  {sourceAllowance.label}
                </Form.Label>
                <input
                  hidden
                  type="checkbox"
                  name={attrs.name}
                  value={sourceAllowance.id}
                  {checked}
                />
              </Form.Control>
            </div>
          {/each}
          <Form.FieldErrors />
        </div>
      </Form.Fieldset>

      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Specifics">
          <Form.Control let:attrs>
            <Form.Label
              >Specify details of checked options stated above (ex.
              Scholarship/STFAP). Please type <b>N/A</b>, if not applicable.</Form.Label
            >
            <Input {...attrs} placeholder="" bind:value={$formData.specifics} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Second_Other_Sources_Of_Allowance">
          <Form.Control let:attrs>
            <Form.Label
              >Other sources of allowance that was not stated above. <br />
              Please type <b>N/A</b>, if not applicable.</Form.Label
            >
            <Input
              {...attrs}
              placeholder=""
              bind:value={$formData.Second_Other_Sources_Of_Allowance}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
    </div>

    <div
      class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
    >
      <h1>Vocational Plans</h1>
      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Course">
          <Form.Control let:attrs>
            <Form.Label>Course</Form.Label>
            <Select.Root
              selected={selectedCourse}
              onSelectedChange={(v) => {
                v &&
                  ($formData.Course = v.value) &&
                  ($formData.CourseLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select a course." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each degprogs as degprog}
                    <Select.Item value={degprog.value} label={degprog.label}
                      >{degprog.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.Course} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Major">
          <Form.Control let:attrs>
            <Form.Label>Major</Form.Label>
            <Select.Root
              selected={selectedMajor}
              onSelectedChange={(v) => {
                v &&
                  ($formData.Major = v.value) &&
                  ($formData.MajorLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select a major." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each majors as major}
                    <Select.Item value={major.value} label={major.label}
                      >{major.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input hidden bind:value={$formData.Major} name={attrs.name} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Form.Field {form} name="Satisfaction">
        <Form.Control let:attrs>
          <Form.Label>Are you satisfied with your course?</Form.Label>
          <Select.Root
            selected={selectedSatisfactionYN}
            onSelectedChange={(v) => {
              v &&
                ($formData.satisfactionYN = v.value) &&
                ($formData.satisfactionYNLabel = v.label);
            }}
          >
            <Select.Trigger {...attrs}>
              <Select.Value placeholder="Select your answer." />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each yesOrNos as yesOrNo}
                  <Select.Item value={yesOrNo.value} label={yesOrNo.label}
                    >{yesOrNo.label}</Select.Item
                  >
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <input
            hidden
            bind:value={$formData.satisfactionYN}
            name={attrs.name}
          />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Fieldset {form} name="Yes_Reasons">
          <div class="mb-4">
            <Form.Legend
              >If <b>YES</b>, check the reasons for choosing this course.</Form.Legend
            >
          </div>
          <div class="gap-4 md:grid md:grid-cols-2">
            {#each yesReasons as yesReason}
              {@const checked = $formData.Yes_Reasons.includes(yesReason.id)}
              <div
                style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
              >
                <Form.Control let:attrs>
                  <Checkbox
                    {...attrs}
                    {checked}
                    onCheckedChange={(v) => {
                      if (v) {
                        addYesReason(yesReason.id);
                      } else {
                        removeYesReason(yesReason.id);
                      }
                    }}
                  />
                  <Form.Label class="ml-2 font-normal">
                    {yesReason.label}
                  </Form.Label>
                  <input
                    hidden
                    type="checkbox"
                    name={attrs.name}
                    value={yesReason.id}
                    {checked}
                  />
                </Form.Control>
              </div>
            {/each}
            <Form.FieldErrors />
          </div>
        </Form.Fieldset>

        <Form.Fieldset {form} name="No_Reasons">
          <div class="mb-4">
            <Form.Legend
              >If <b>NO</b>, check your reasons why you do not like your course.</Form.Legend
            >
          </div>
          <div class="gap-4 md:grid md:grid-cols-2">
            {#each noReasons as noReason}
              {@const checked = $formData.No_Reasons.includes(noReason.id)}
              <div
                style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
              >
                <Form.Control let:attrs>
                  <Checkbox
                    {...attrs}
                    {checked}
                    onCheckedChange={(v) => {
                      if (v) {
                        addNoReason(noReason.id);
                      } else {
                        removeNoReason(noReason.id);
                      }
                    }}
                  />
                  <Form.Label class="ml-2 font-normal">
                    {noReason.label}
                  </Form.Label>
                  <input
                    hidden
                    type="checkbox"
                    name={attrs.name}
                    value={noReason.id}
                    {checked}
                  />
                </Form.Control>
              </div>
            {/each}
            <Form.Field {form} name="Other_Course">
              <Form.Control let:attrs>
                <Form.Label>What course do you prefer?</Form.Label>
                <Input
                  {...attrs}
                  placeholder=""
                  bind:value={$formData.Other_Course}
                />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
            <Form.FieldErrors />
          </div>
        </Form.Fieldset>
      </div>

      <div class="gap-4 md:grid md:grid-cols-2">
        <Form.Field {form} name="Other_Yes_Reasons">
          <Form.Control let:attrs>
            <Form.Label>Other reasons not stated above.</Form.Label>
            <Input
              {...attrs}
              placeholder=""
              bind:value={$formData.Other_Yes_Reasons}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Other_No_Reasons">
          <Form.Control let:attrs>
            <Form.Label>Other reasons not stated above.</Form.Label>
            <Input
              {...attrs}
              placeholder=""
              bind:value={$formData.Other_No_Reasons}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Finish_In_UPB">
          <Form.Control let:attrs>
            <Form.Label
              >Do you intend to finish your course here at UP Baguio?</Form.Label
            >
            <Select.Root
              selected={selectedFinishInUPBYN}
              onSelectedChange={(v) => {
                v &&
                  ($formData.FinishInUPBYN = v.value) &&
                  ($formData.FinishInUPBYNLabel = v.label);
              }}
            >
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your answer." />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each yesOrNos as yesOrNo}
                    <Select.Item value={yesOrNo.value} label={yesOrNo.label}
                      >{yesOrNo.label}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <input
              hidden
              bind:value={$formData.FinishInUPBYN}
              name={attrs.name}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="Transfer_Reasons">
          <Form.Control let:attrs>
            <Form.Label
              >If <b>NO</b>, where do you intend to transfer?
            </Form.Label>
            <Input
              {...attrs}
              placeholder=""
              bind:value={$formData.Transfer_Reasons}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <Form.Fieldset {form} name="Future_Plans">
        <div class="mb-4">
          <Form.Legend
            >What are your plans after graduation? (Please check as many as
            appropriate)</Form.Legend
          >
        </div>
        <div class="gap-4 md:grid md:grid-cols-2">
          {#each futurePlans as futurePlan}
            {@const checked = $formData.Future_Plans.includes(futurePlan.id)}
            <div
              style="border: 0.5px solid #e0e0e0; border-radius: 6px; padding: 15px; display: flex; align-items: center;"
            >
              <Form.Control let:attrs>
                <Checkbox
                  {...attrs}
                  {checked}
                  onCheckedChange={(v) => {
                    if (v) {
                      addFuturePlan(futurePlan.id);
                    } else {
                      removeFuturePlan(futurePlan.id);
                    }
                  }}
                />
                <Form.Label class="ml-2 font-normal">
                  {futurePlan.label}
                </Form.Label>
                <input
                  hidden
                  type="checkbox"
                  name={attrs.name}
                  value={futurePlan.id}
                  {checked}
                />
              </Form.Control>
            </div>
          {/each}
          <Form.Field {form} name="Other_Future_Plans">
            <Form.Control let:attrs>
              <Form.Label>Others (Please specify)</Form.Label>
              <Input
                {...attrs}
                placeholder=""
                bind:value={$formData.Other_Future_Plans}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.FieldErrors />
        </div>
      </Form.Fieldset>

      <div
        class="center relative top-1/2 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Leisure Time Activities</h1>
        <div class="gap-4 md:grid md:grid-cols-2">
          <Form.Field {form} name="Recreational_Activities">
            <Form.Control let:attrs>
              <Form.Label>Recreation/social activities:</Form.Label>
              <Input
                {...attrs}
                bind:value={$formData.Recreational_Activities}
              />
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

          <Form.Field {form} name="Clubs_Joined">
            <Form.Control let:attrs>
              <Form.Label>Clubs/Organization you belong to:</Form.Label>
              <Input {...attrs} bind:value={$formData.Clubs_Joined} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Clubs_To_Join">
            <Form.Control let:attrs>
              <Form.Label>Clubs/Organization you would like to join:</Form.Label
              >
              <Input {...attrs} bind:value={$formData.Clubs_To_Join} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="Reading">
            <Form.Control let:attrs>
              <Form.Label>Do you like reading?</Form.Label>
              <Select.Root
                selected={selectedReadingYN}
                onSelectedChange={(v) => {
                  v &&
                    ($formData.readingYN = v.value) &&
                    ($formData.readingYNLabel = v.label);
                }}
              >
                <Select.Trigger {...attrs}>
                  <Select.Value placeholder="Select your answer." />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    {#each yesOrNos as yesOrNo}
                      <Select.Item value={yesOrNo.value} label={yesOrNo.label}
                        >{yesOrNo.label}</Select.Item
                      >
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <input
                hidden
                bind:value={$formData.readingYN}
                name={attrs.name}
              />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="YesReading">
            <Form.Control let:attrs>
              <Form.Label>If yes, what do you like to read?</Form.Label>
              <Input {...attrs} bind:value={$formData.YesReading} />
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </div>

      <div
        class="center relative top-1/2 mb-10 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Closing Question</h1>
        <p>
          What are your dreams and aspirations in life, your expectations of UP
          Baguio, and your objectives for studying in UPB?
        </p>

        <Form.Field {form} name="Dreams">
          <Form.Control let:attrs>
            <Input {...attrs} bind:value={$formData.Dreams} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <div
        class="center relative top-1/2 mb-10 mt-10 flex flex-col gap-3 rounded-lg border bg-white px-8 py-8"
      >
        <h1>Image</h1>

        <Form.Field {form} name="Image">
          <Form.Control let:attrs>
            <Label for="picture">Upload your image here.</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              bind:value={$formData.Image}
            />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <form.button class="w-full">submit</form.button>
    </div>
  </form>

  <!-- {#if browser}
<SuperDebug data={$formData} />
{/if} -->
</div>
