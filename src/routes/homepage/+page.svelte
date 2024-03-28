<head>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap" rel="stylesheet">
  
<style>
	/* header{
		background-color: maroon;
		color: white;
		padding-top: 10px;
		padding-bottom: 10px;
		font-weight: 500;
	} */

	header{
		margin-top: 30px;
		margin-left: 25px;
		display: flex;
		font-family : Urbanist, sans-serif;
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
		/* border-style: solid; */
		border-width: 2px;
		border-color: black;
		border-radius: 0.75rem; /* 12px */
		margin: 10px;
		padding: 30px;
		font-weight: 600;
		background-color: #8e1537;
		color: white;
		transition-duration: 0.4s;
  		cursor: pointer;
	}

	.buttons:hover{
		background-color: #045b62;
	}

	img{
		width: 100px;
		height: 100px;
		max-width: 100%;
		max-height: 100%;
		object-fit: fill;
	}
	
	.square{
		position: relative;
		background-color: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		border-radius: 0.5rem;
		padding: 30px 30px 30px 30px;
		max-width: 768px;
		height: 55%;
		width: 100%;
		transform: translate(10%, 0%);
	}
</style>
</head>

<body class="container">
	<div class="square">
	<h1 style="text-align: left; line-height: 5px; font-weight: 800; font-size: 50px; padding-top: 40px; padding-left: 25px;">WELCOME!</h1>
	<p style="padding-left: 25px; padding-bottom: 10px;">You have entered the OCG Patnubay Aguhon. Please select a category.</p>
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
	</div>
</body>