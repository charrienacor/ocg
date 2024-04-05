<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { buttonVariants } from "$lib/components/ui/button";
  import { goto } from "$app/navigation";
</script>

<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap"
    rel="stylesheet"
  />

  <style>
    body {
      font-family: Urbanist, sans-serif;
    }
  </style>
</head>

<body class="relative flex overflow-x-hidden justify-center">
  <img
    class="absolute z-0 max-w-3xl -right-32 sm:-right-28 md:-right-32 opacity-40 sm:opacity-60 sm:mad-md:opacity-80"
    src="oble.png"
    alt="Logo"
  />

  <div class="static z-50 ml-10 mt-28">
    <h1 style="text-align:left; font-weight: 900; font-size: 60px; margin-top: 20px; margin-bottom:0px; line-height:80px; background: -webkit-linear-gradient(#8e1537, #00573f); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
    >
      UPB OCG PATNUBAY <br />
      <span
        style="font-size: 65px; margin-top: 0px; padding-top: 0px; line-height:0px; background: -webkit-linear-gradient(#8e1537, #00573f); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        >AGUHON</span
      >
    </h1>
    <div class="static z-50">
      <div class="w-4/6 sm:w-6/12">
        <p
          style="font-size: 18px; line-height: 28px; color: rgb(55 65 81); padding: 10px 0px 30px 0px;"
        >
          The Office of Counseling and Guidance (OCG) is a service-oriented unit, fundamental and integral partner to the academic programs of the University of the Philippines Baguio.
        </p>
      </div>
      <div class="static z-50">
        <Button on:click={() => goto("/homepage")}
          style="z-index: 50;">Enter Aguhon</Button>
        <a
          href="https://www.upb.edu.ph/office-of-counseling-and-guidance/"
          class={buttonVariants({ variant: "default" })}
          style="z-index: 50;"
          ><span>Learn More</span>
        </a>
      </div>
    </div>
  </div>
</body>
