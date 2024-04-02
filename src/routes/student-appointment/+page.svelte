<script lang="ts">
  import type { PageServerData } from "./$types";
  import SettingsForm from "./SettingsForm.svelte";
  export let data: PageServerData;
</script>

<div class="">
  <SettingsForm data={data.form} />
</div>
