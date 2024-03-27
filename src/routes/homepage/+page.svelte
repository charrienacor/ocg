<head>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap" rel="stylesheet">
  
<style>
	header{
		background-color: maroon;
		color: white;
		padding-top: 10px;
		padding-bottom: 10px;
		font-weight: 500;
	}

	body {
		font-family : Urbanist, sans-serif;
	}

	.container {
        position: relative;
      }

	.user {
		display: inline-block;
		color: white;
	}

	.box {
        width: 100%;
        height: 100%;
        position: relative;
		text-align: center;
        top: 0;
        left: 0;
    }

    .buttons {
		width:  20vw;
		height: 15vw;
		text-align: center;
		border-style: solid;
		border-width: 2px;
		border-color: black;
		border-radius: 0.75rem; /* 12px */
		margin: 10px;
		padding: 30px;
		font-weight: 600;
		background-color: #7B1113;
		color: white;
		transition-duration: 0.4s;
  		cursor: pointer;
	}

	.buttons:hover{
		background-color: #9d1518;
	}

	img{
		width: 100px;
		height: 100px;
		max-width: 100%;
		max-height: 100%;
		object-fit: fill;
	}
	
</style>
</head>

<body class="container">
	<h1 style="text-align: left; line-height: 5px; font-weight: 800; font-size: 50px; padding-top: 40px;">WELCOME!</h1>
	<p>You have entered the OCG Patnubay Aguhon. Please select a category.</p>
	<br>
	<div class="box">
            <a href="/login-admin" class="user">
				<div class="buttons">
				<img src="admin-icon.png" alt="admin" style="icons"/>   
				<br>
				<span style="font-size: 33px;">ADMINISTRATOR</span> 
				<br>
				<p>To gain full control and access rights.</p>
				</div>                
            </a>
			
			<a href="/login-student" class="user" style="translate: 0px 23px;">
				<div class="buttons" >
					<img src="student-icon.png" alt="student" style="icons"/>
					<br>
					<span style="font-size: 33px;">STUDENT</span>  
					<br>
					<p>To fill in the Background Information Sheet or avail free services.</p>
				</div>                  
			</a>
	</div>
</body>