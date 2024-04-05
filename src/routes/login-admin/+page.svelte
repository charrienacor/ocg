<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap"
    rel="stylesheet"
  />

  <style>
    header {
      display: flex;
      font-family: Urbanist, sans-serif;
    }

    body {
      font-family: Urbanist, sans-serif;
    }

    /* .mainbody {
      display: flex;
      position: relative;
      justify-content: center;
    } */
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
      margin-bottom: 55px;
      color: rgb(55 65 81);
      width: 110%;
    }

    .subtitle {
      display: block;
      font-size: 0.875rem; /* 14px */
      line-height: 1.25rem; /* 20px */
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

    img {
      z-index: 0;
    }

    a {
      font-size: 0.75rem; /* 12px */
      line-height: 1rem; /* 16px */
      color: maroon;
    }

    a:hover {
      color: gray;
    }

    a:focus {
      outline: none;
      box-shadow: var(--tw-ring-inset) 0 0 0
        calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      --tw-ring-offset-width: 2px;
      box-shadow:
        0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color),
        var(--tw-ring-shadow);
      --tw-ring-color: rgb(99 102 241);
    }

    .forgot {
      text-align: center;
      width: 110%;
    }

    .login-button {
      width: 110%;
      display: flex;
      justify-content: center;
      padding-top: 0.5rem; /* 8px */
      padding-bottom: 0.5rem; /* 8px */
      padding-left: 1rem; /* 16px */
      padding-right: 1rem; /* 16px */
      border: transparent;
      border-radius: 0.375rem; /* 6px */
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      font-size: 0.875rem; /* 14px */
      line-height: 1.25rem; /* 20px */
      font-weight: 500;
      color: white;
      background-color: maroon;
    }

    .login-button:hover {
      outline: solid;
      box-shadow: var(--tw-ring-inset) 0 0 0
        calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      --tw-ring-offset-width: 2px;
      box-shadow:
        0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color),
        var(--tw-ring-shadow);
      --tw-ring-color: rgb(99 102 241);
      background-color: #f5f5f5;
    }

     /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 650px) {
      .square {
        position: absolute;
        height: 35px;
        width: 100%;
        transform: translate(-70%, 15%);
      }

      .title{
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

      .title{
        font-size: 4vw;
      }
    }
  </style>
</head>

<body class="relative flex justify-center overflow-hidden">
  <div class="square absolute mt-32 sm:mt-10 sm:relative">
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
      <div style="margin-bottom: 3rem;">
        <label for="password" class="subtitle">Password</label>
        <input
          type="password"
          id="password"
          class="input-box"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button on:click={() => goto("/dashboard-admin")} class="login-button"
        >Login</Button
      >
      <div class="forgot">
        <a href="https://www.roblox.com/Login">Forgot Password?</a>
      </div>
    </form>
  </div>
  <img
    class="absolute -right-32 z-0 max-w-3xl md:right-1 md:top-1 md:max-w-lg opacity-40 sm:opacity-60 sm:mad-md:opacity-80"    
    src="oble.png"
    alt="Logo"
  />
</body>