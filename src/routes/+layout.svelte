<script lang="ts">
  import "../app.pcss";
  import Header from "./Header.svelte";
  import "./styles.css";
  import { getFlash } from "sveltekit-flash-message";
  import { page } from "$app/stores";
  import { Toaster } from "$lib/components/ui/sonner";
  import { toast } from "svelte-sonner";
  import CustomToast from "./CustomToast.svelte";
  import { onMount } from "svelte";
  const flash = getFlash(page);

  onMount(() => {
    if ($flash) {
      toast.custom(CustomToast, {
        componentProps: {
          type: `${$flash.type}`,
          message: `${$flash.message}`,
        },
      });
    }
  });

  $: if ($flash) {
    toast.custom(CustomToast, {
      componentProps: {
        type: `${$flash.type}`,
        message: `${$flash.message}`,
      },
    });
  }
</script>

<Toaster position="top-right" class="" />
<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="app">
  <Header></Header>
  <main class="h-screen w-screen">
    <slot />
  </main>
</div>
