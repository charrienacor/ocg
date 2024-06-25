<script lang="ts">
  import type { PageServerData } from "./$types";
  import BISForm from "$lib/components/bis/BISForm.svelte";
  import {
    CalendarDays,
    FileTextIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
  } from "lucide-svelte";
  export let data: PageServerData;
</script>

<BISForm data={data.form} />
