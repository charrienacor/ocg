<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  const name: string = data.name;
</script>

<h1>Hi {name}~</h1>
