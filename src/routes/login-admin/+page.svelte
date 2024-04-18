<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
</script>

<style>
    .square {
      z-index: 2;
      background-color: white;
      box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
      border-radius: 0.5rem;
      padding: 1.5rem 3.5rem 1.5rem 2rem;
    }

    .mini-title {
      font-size: 10px;
      line-height: 5px;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 15px;
      width: 110%;
    }

    .title {
      line-height: 2rem; 
      font-weight: bold;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 55px;
      color: rgb(55 65 81);
      width: 110%;
    }

    .subtitle {
      display: block;
      font-size: 0.875rem;
      line-height: 1.25rem; 
      font-weight: 500;
      color: rgb(55 65 81);
      margin-bottom: 0.25rem;
      text-align: left;
    }

    .input-box {
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      border-radius: 0.375rem; /* 6px */
      width: 110%;
      padding-left: 0.75rem; /* 12px */
      padding-right: 0.75rem; /* 12px */
      padding-top: 0.5rem; /* 8px */
      padding-bottom: 0.5rem; /* 8px */
      border: solid;
      border-color: rgb(209 213 219);
    }

    input:focus {
      outline: none;
      --tw-ring-color: rgb(99 102 241);
      --tw-border-opacity: 1;
      border-color: rgba(99, 102, 241, var(--tw-border-opacity));
    }

    @media only screen and (min-width: 650px) {
      .square {
        position: absolute;
        height: 35px;
        width: 100%;
        transform: translate(-70%, 15%);
      }

      .title {
        font-size: 60px;
        font-weight: 900;
      }
    }

    @media only screen and (min-width: 650px) {
      .square {
        position: relative;
        max-width: 768px;
        height: 35%;
        width: 35%;
        align-items: left;
        transform: translate(-70%, 15%);
      }

      .title {
        font-size: 4vw;
      }
    }
</style>

<div class="relative flex justify-center">
  <div class="square absolute mt-32 sm:relative sm:mt-10">
    <h2 class="mini-title">ADMIN ACCOUNT</h2>
    <h1 class="title">LOG IN</h1>
    <form action="#">
      <div style="margin-bottom: 2rem;">
        <label for="email" class="subtitle">UP Mail Address</label>
        <input
          type="email"
          id="email"
          class="input-box"
          placeholder="your@up.edu.ph"
          required
        />
      </div>
      <div style="margin-bottom: 40px;">
        <label for="password" class="subtitle">Password</label>
        <input
          type="password"
          id="password"
          class="input-box"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button on:click={() => goto("/dashboard-admin")} style="width: 110%; padding-bottom: 15px;">Login</Button>
    </form>
  </div>
  <img
    class="sm:mad-md:opacity-80 absolute -right-32 z-0 max-w-3xl opacity-40 sm:opacity-60 md:right-1 md:top-1 md:max-w-lg"
    src="oble.png"
    alt="Logo"
  />
</div>
