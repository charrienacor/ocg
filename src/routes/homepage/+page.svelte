<head>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap" rel="stylesheet">
  
<style>
	body {
		font-family : Urbanist, sans-serif;
		background-color: rgb(0 0 0);
		background-color: rgb(243 244 246);
	}

	.container {
        position: relative;
        margin: 30px;
      }

	  .box {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .button {
		border-style: solid;
		border-width: 2px;
		border-color: black;
		border-radius: 0.75rem; /* 12px */
		margin: 10px 10px 10px 10px;
		padding: 10px 30px 10px 30px;
		font-weight: 600;
		background-color: #7B1113;
		color: white;
		transition-duration: 0.4s;
  		cursor: pointer;
	  }

	  .button:hover{
		background-color: #e7e7e7;
        color: black;
	  }
</style>
</head>

<body class="container">
	<div class="box">
		<div class="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">
            <a href="/login-admin" class="button"><span class="relative text-sm font-semibold text-primary dark:text-primaryLight">Admin</span>                    
            </a>
            <a href="/login-student" class="button"><span class="relative text-sm font-semibold text-white dark:text-gray-900">Student</span>                    
            </a>
        </div>
	</div>
</body>