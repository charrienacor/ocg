<head>
	<style>
		.container {
			min-height: 100vh;
			display: flex;
			text-align: left;
			justify-content: center;
			width: 100%;
			background-color: white;
		}
	
		.square{
			background-color: white;
			box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
			border-radius: 0.5rem;
			padding-left: 2rem; /* 32px */
			padding-right: 3.5rem; /* 32px */
			padding-top: 1.5rem; /* 24px */
			padding-bottom: 1.5rem; /* 24px */
			max-width: 768px;
			height: 55%;
			align-items: left;
			transform: translate(-70%, 15%);
		}
	
		.mini-title{
			font-size: 10px;
			line-height: 5px;
			text-align: center;
			margin-top: 30px;
			margin-bottom: 10px;
		}
	
		.title {
			font-size: 50px;
			line-height: 2rem; /* 32px */
			font-weight: bold;
			text-align: center;
			margin-top: 10px;
			margin-bottom: 55px;
			color: rgb(55 65 81);
		}
	
		.subtitle{
			display:block;
			font-size: 0.875rem; /* 14px */
			line-height: 1.25rem; /* 20px */
			font-weight: 500;
			color: rgb(55 65 81);
			margin-bottom: 0.25rem;
			text-align: left;
		}
	
		.input-box{
			box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
			border-radius: 0.375rem; /* 6px */
			width: 100%;
			padding-left: 0.75rem; /* 12px */
			padding-right: 0.75rem; /* 12px */
			padding-top: 0.5rem; /* 8px */
			padding-bottom: 0.5rem; /* 8px */
			border: solid;
			border-color: rgb(209 213 219);
		}
	
		input:focus{
			outline: none;
			--tw-ring-color: rgb(99 102 241);
			--tw-border-opacity: 1;
			border-color: rgba(99, 102, 241, var(--tw-border-opacity));
		}
	
		a {
			font-size: 0.75rem; /* 12px */ 
			line-height: 1rem; /* 16px */
			color: rgb(75 85 99);
		}
	
		a:hover{
			color: rgb(99 102 241);
		}
	
		a:focus{
			outline: none;
			box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
			--tw-ring-offset-width: 2px;
			box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow);
			--tw-ring-color: rgb(99 102 241);
		}
	
		.login-button{
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
	
		.login-button:hover{
			outline: none;
			box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
			--tw-ring-offset-width: 2px;
			box-shadow: 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color), var(--tw-ring-shadow);
			--tw-ring-color: rgb(99 102 241);
			background-color: gray;
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
			transform: translate(40%, 5%);
		  }
	</style>
</head>
<body class="container">
	<div class="square">
		<h2 class="mini-title">STUDENT ACCOUNT</h2>
		<h1 class="title">LOG IN</h1>
		<form action="#">
			<div style="margin-bottom: 2rem;">
				<label for="email" class="subtitle">Email Address</label>
				<input type="email" id="email" class="input-box" placeholder="your@email.com" required>
			</div>
			<div style="margin-bottom: 4rem;">
				<label for="password" class="subtitle">Password</label>
				<input type="password" id="password" class="input-box" placeholder="Enter your password" required>
				<a href="https://www.roblox.com/Login" class="forgot">Forgot Password?</a>
			</div>
			<button type="submit" class="login-button">Login</button>
		</form>
	</div>
	<div class="box overlay">
		<img style="width: 55%; height: 110%; " src="oble.png" alt="Logo" />
	</div>
</body>