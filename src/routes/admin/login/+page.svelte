<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="relative flex justify-center">
  <div
    class="square absolute mt-32 flex w-5/6 flex-col gap-1 sm:relative sm:mt-28"
  >
    <h2 class="mini-title static">ADMIN ACCOUNT</h2>
    <h1 class="title center static">LOG IN</h1>
    <p class="subtitle">
      To log in to your account, please use your designated UP Mail
      (your@up.edu.ph).
    </p>
    <Button on:click={() => goto("/admin/login/google")} style="width: 110%;"
      >Login with UP Mail</Button
    >
  </div>
  <img
    class="sm:mad-md:opacity-80 absolute -right-32 z-0 max-w-3xl opacity-40 sm:opacity-60 md:right-1 md:top-1 md:max-w-lg"
    src="/oble.png"
    alt="Logo"
  />
</div>

<style>
  .square {
    z-index: 2;
    background-color: white;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    padding-left: 2rem; /* 32px */
    padding-right: 3.5rem; /* 32px */
    padding-top: 1.5rem; /* 24px */
    padding-bottom: 1.5rem; /* 24px */
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
    line-height: 2rem; /* 32px */
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
    color: rgb(55 65 81);
    width: 110%;
  }

  .subtitle {
    display: block;
    font-size: 0.875rem; /* 14px */
    line-height: 1.25rem; /* 20px */
    font-weight: 500;
    color: rgb(55 65 81);
    margin-bottom: 30px;
    text-align: center;
    width: 110%;
  }

  @media only screen and (min-width: 650px) {
    .square {
      position: absolute;
      height: 30px;
      width: 90%;
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
