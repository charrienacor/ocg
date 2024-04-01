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
      background-color: rgb(0 0 0);
      background-color: rgb(243 244 246);
    }
  </style>
</head>

<body class="relative">
  <img
    class="absolute right-1 top-1 z-0 ms-auto h-auto max-w-lg"
    src="oble.png"
    alt="Logo"
  />

  <div class="static z-50">
    <h1
      style="text-align:left; font-weight: 900; font-size: 60px; margin-top: 20px; background: -webkit-linear-gradient(#8e1537, #00573f); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
    >
      UPB OCG PATNUBAY <br />
      <span
        style="font-size: 65px; margin-top: 10px; background: -webkit-linear-gradient(#8e1537, #00573f); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        >AGUHON</span
      >
    </h1>
    <div class="static z-50">
      <div style="width: 50%;">
        <p
          style="font-size: 18px; line-height: 28px; color: rgb(55 65 81); padding: 0px 10px 20px 10px;"
        >
          The Office of Counseling and Guidance (OCG) is a service-oriented
          unit, fundamental and integral partner to the academic programs of the
          University of the Philippines Baguio.
        </p>
      </div>
      <div class="static">
        <Button on:click={() => goto("/homepage")}>Enter Aguhon</Button>
        <a
          href="https://www.upb.edu.ph/office-of-counseling-and-guidance/"
          class={buttonVariants({ variant: "default" })}
          ><span>Learn More</span>
        </a>
      </div>
    </div>
  </div>
</body>
