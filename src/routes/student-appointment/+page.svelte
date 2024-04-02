<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  export let data: PageServerData;
</script>

<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap"
    rel="stylesheet"
  />

  <style>
    header {
        display: flex;
        font-family: Urbanist, sans-serif;
        background-color:#8e1537;
        color: white;
        padding-bottom: 20px;
      }

    body {
      font-family: Urbanist, sans-serif;
    }
  </style>
</head>

<div class="">
  <SettingsForm data={data.form} />
</div>
