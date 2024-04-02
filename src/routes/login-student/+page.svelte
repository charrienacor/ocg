<script lang="ts">
  import { onMount } from "svelte";
  import { initializeApp, type FirebaseApp } from "firebase/app";

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
      position: relative;
      background-color: white;
      box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
      border-radius: 0.5rem;
      padding-left: 2rem; /* 32px */
      padding-right: 3.5rem; /* 32px */
      padding-top: 1.5rem; /* 24px */
      padding-bottom: 1.5rem; /* 24px */
      max-width: 768px;
      height: 35%;
      width: 35%;
      align-items: left;
      transform: translate(-70%, 15%);
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
      font-size: 4vw;
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

    .google-button {
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

    .google-button:hover {
      outline: none;
      box-shadow: var(--tw-ring-inset) 0 0 0
        calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      --tw-ring-offset-width: 2px;
      box-shadow:
        0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color),
        var(--tw-ring-shadow);
      --tw-ring-color: rgb(99 102 241);
      background-color: gray;
    }
  </style>
</head>

<div class="relative flex h-full min-h-screen w-full justify-center">
  <div class="square mt-16">
    <h2 class="mini-title">STUDENT ACCOUNT</h2>
    <h1 class="title">LOG IN</h1>
    <p class="subtitle">
      To log in to your account, please use your designated UP Mail
      (your@up.edu.ph).
    </p>
    <button on:click={signInWithGoogle} class="google-button"
      >Login with UP Mail</button
    >
  </div>
  <img
    class="absolute -right-1 top-20 z-0 ms-auto h-auto max-w-sm md:right-1 md:top-1 md:max-w-lg"
    src="oble.png"
    alt="Logo"
  />
</div>
