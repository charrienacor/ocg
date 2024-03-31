<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  export let data: PageServerData;

  const name = data.name;
</script>

<h1>Hi {name}~</h1>

<SettingsForm data={data.form} />