<header>
  <div class="corner sm:w-36">
    <a href="https://up.edu.ph/"
      ><img src="UP Logo.png" alt="UP Logo" class="logo ml-6 w-16" />
    </a>
  </div>
  <div class="next-to-logo">
    <p class="school">
      University of the Philippines - Baguio<br /><b class="office"
        >Office of Guidance and Counseling</b
      >
    </p>
  </div>
</header>

<style>
  header {
    display: flex;
  }

  a {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .logo {
    object-fit: contain;
    margin-top: 20px;
  }

  a:hover {
    color: var(--color-theme-1);
  }

  .next-to-logo {
    font: left;
    margin-left: 20px;
  }

  .school {
    margin-top: 27px;
    line-height: 1.2;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 610px) {
    .corner {
      width: 5px;
      height: 5px;
    }

    .school {
      font-size: 30px;
    }

    .office {
      font-size: 50px;
    }
  }

  @media only screen and (min-width: 611px) {
    .corner {
      width: 150px;
    }

    .school {
      font-size: 20px;
      margin-left: 13px;
    }

    .office {
      font-size: 30px;
    }

    .logo {
      width: 150px;
      height: 75px;
    }
  }
</style>
