<script lang="ts">
  import {
    CircleCheck,
    Info,
    LogIn,
    ShieldAlert,
    ShieldX,
  } from "lucide-svelte";
  import { Separator } from "$lib/components/ui/separator";
  export let type: any;
  export let message: any;
</script>

<div class="mr-5 w-[370px] rounded-md bg-secondary">
  {#if type === "appointmentSuccess"}
    <div
      class="flex rounded-md border-2 border-up-forest-green bg-up-forest-green bg-opacity-5 p-5"
    >
      <div class="flex flex-row gap-3">
        <div class="flex items-center">
          <CircleCheck color="#014421" />
        </div>
        <div class="flex flex-col">
          <div>
            <div class="font-bold text-up-forest-green">
              You have booked an appointment!
            </div>
          </div>
          <Separator class="bg-up-forest-green" />
          <div class="font-normal">
            {message}
          </div>
        </div>
      </div>
    </div>
  {:else if type === "somethingWentWrong"}
    <div class="flex rounded-md border-2 border-primary bg-primary p-5">
      <div class="flex flex-row gap-3">
        <div class="flex items-center">
          <ShieldX color="#FFFFFF" />
        </div>
        <div class="flex flex-col">
          <div>
            <div class="font-bold text-secondary">Something went wrong!</div>
          </div>
          <Separator class="bg-secondary" />
          <div class="font-normal text-secondary">
            {message}
          </div>
        </div>
      </div>
    </div>
  {:else if type === "unauthorizedAccess"}
    <div class="flex rounded-md border-2 border-primary bg-primary p-5">
      <div class="flex flex-row gap-3">
        <div class="flex items-center">
          <ShieldX color="#FFFFFF" />
        </div>
        <div class="flex flex-col">
          <div>
            <div class="font-bold text-secondary">Unauthorized Access!</div>
          </div>
          <Separator class="bg-secondary" />
          <div class="font-normal text-secondary">
            {message}
          </div>
        </div>
      </div>
    </div>
  {:else if type === "appointmentError"}
    <div class="flex rounded-md border-2 border-primary bg-primary p-5">
      <div class="flex flex-row gap-3">
        <div class="flex items-center">
          <ShieldAlert color="#FFFFFF" />
        </div>
        <div class="flex flex-col">
          <div>
            <div class="font-bold text-secondary">Something went wrong!</div>
          </div>
          <Separator class="bg-secondary" />
          <div class="font-normal text-secondary">
            {message}
          </div>
        </div>
      </div>
    </div>
  {:else if type === "loggedIn"}
    <div
      class="flex rounded-md border-2 border-up-forest-green bg-up-forest-green bg-opacity-5 p-5"
    >
      <div class="flex flex-row gap-3">
        <div class="flex items-center">
          <LogIn color="#014421" />
        </div>
        <div class="flex flex-col">
          <div>
            <div class="font-bold text-up-forest-green">Logged In!</div>
          </div>
          <Separator class="bg-up-forest-green" />
          <div class="font-normal">
            {message}
          </div>
        </div>
      </div>
    </div>
  {:else if type === "loggedOut"}
    <div
      class="flex rounded-md border-2 border-primary bg-secondary bg-opacity-5 p-5"
    >
      <div class="flex flex-row gap-3">
        <div class="flex items-center">
          <Info color="#7b1113" />
        </div>
        <div class="flex flex-col">
          <div>
            <div class="font-bold text-primary">Logged Out!</div>
          </div>
          <Separator class="bg-up-forest-green" />
          <div class="font-normal">
            {message}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
