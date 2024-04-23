<script>
  import "../app.pcss";
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap"
    rel="stylesheet"
  />
</head>

<div class="app">
  <Header></Header>
  <main>
    <slot />
  </main>
</div>
