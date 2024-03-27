<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="hero section">

    <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap" rel="stylesheet">
  
<style>
	body {
		font-family : Urbanist, sans-serif;
		background-color: rgb(0 0 0);
		background-color: rgb(243 244 246);
	}

	.container {
        position: relative;
        margin: 40px;
      }

	  .box {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .overlay {
        z-index: 1;
        margin: 30px;
		transform: translate(40%, 0%);
      }

	  .enter {
		position: relative;
		flex: 0 1 auto;
		height: 2.25rem; /* 36px */
		margin-left: auto;
		align-items: center;
		justify-content: center;
		padding-left: 1.5rem; /* 24px */
		padding-right: 1.5rem; /* 24px */
	  }

	  .button {
		border-style: solid;
		border-width: 2px;
		border-color: black;
		border-radius: 0.75rem; /* 12px */
		margin: 0px 10px 10px 10px;
		padding: 10px 30px 10px 30px;
		font-weight: 600;
		background-color: #8e1537;
		color: white;
		transition-duration: 0.4s;
  		cursor: pointer;
	  }

	  .button:hover{
		background-color: #e7e7e7;
	  }
</style>
</head>

<body class="container">
	<div class="box">
		<h1 style="text-align:left; font-weight: 900; font-size: 60px; background: -webkit-linear-gradient(#8e1537, #00573f); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">UPB OCG PATNUBAY <br> 
			<span style="font-size: 65px; background: -webkit-linear-gradient(#8e1537, #00573f); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AGUHON</span>
		</h1>
		<div class="lg:flex">
			<div style="width: 50%;">
				<p style="font-size: 18px; line-height: 28px; color: rgb(55 65 81); padding: 0px 10px 20px 10px;">
					The Office of Counseling and Guidance (OCG) is a service-oriented unit, fundamental and integral partner to the academic programs of the University of the Philippines Baguio.
				</p>
			</div>
			<div class="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">
				<a href="/sverdle" class="button"><span class="relative text-sm font-semibold text-primary dark:text-primaryLight">Enter Aguhon</span>                    
				</a>
				<a href="https://www.upb.edu.ph/office-of-counseling-and-guidance/" class="button"><span class="relative text-sm font-semibold text-white dark:text-gray-900">Learn More</span>                    
				</a>
			</div>
		</div>	
	</div>
	<div class="box overlay">
			<img style="width: 75%; height: 110%; " src="oble.png" alt="Logo" />
	</div>
</body>