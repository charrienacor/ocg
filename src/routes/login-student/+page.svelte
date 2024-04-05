<script lang="ts">
  import { onMount } from "svelte";
  import { initializeApp, type FirebaseApp } from "firebase/app";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    GoogleAuthProvider,
    initializeAuth,
    type Auth,
    browserSessionPersistence,
    browserPopupRedirectResolver,
    signInWithRedirect,
    getRedirectResult,
  } from "firebase/auth";
  import { goto } from "$app/navigation";

  let app: FirebaseApp;
  let auth: Auth;
  const firebaseConfig = {
    apiKey: "AIzaSyDrK6Sxkx91G9IhzrWzlwK5z8rvOT1Mj7k",
    authDomain: "aguhon-c1026.firebaseapp.com",
    projectId: "aguhon-c1026",
    storageBucket: "aguhon-c1026.appspot.com",
    messagingSenderId: "224957047205",
    appId: "1:224957047205:web:2de2d3389bdb0589f9884c",
  };
  onMount(async () => {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: browserSessionPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });

    const result = await getRedirectResult(auth, browserPopupRedirectResolver);
    if (result) {
      const idToken = await result.user.getIdToken();

      const response = await fetch("api/sessionLogin", {
        method: "POST",
        body: JSON.stringify({ idToken }),
        headers: {
          "content-type": "application/json",
        },
      });

      const { url, redirected } = response;
      if (redirected) {
        goto(url);
      }
    }
  });

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    await signInWithRedirect(auth, provider);
  }
</script>

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

    .mainbody {
      min-height: 100vh;
      display: flex;
      position: relative;
      text-align: left;
      justify-content: center;
      width: 100%;
      background-color: white;
    }

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

<div class="relative flex h-full min-h-screen w-full justify-center">
  <div class="square absolute mt-32 sm:relative sm:mt-28 flex flex-col gap-1 w-5/6">
    <h2 class="mini-title static">STUDENT ACCOUNT</h2>
    <h1 class="title center static">LOG IN</h1>
    <p class="subtitle">
      To log in to your account, please use your designated UP Mail
      (your@up.edu.ph).
    </p>

    <Button on:click={() => goto("/login-student/google")} style="width: 110%;"
      >Login with UP Mail</Button
    >
  </div>
  <img
    class="absolute -right-32 z-0 max-w-3xl md:right-1 md:top-1 md:max-w-lg opacity-40 sm:opacity-60 sm:mad-md:opacity-80"
    src="oble.png"
    alt="Logo"
  />
</div>
