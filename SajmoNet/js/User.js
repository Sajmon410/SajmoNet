class User{
	user_id='';
	username='';
	email='';
	password='';
	api_url='https://63ad8e14ceaabafcf165b15d.mockapi.io';

	create(){
		let data={
			username:this.username,
			email:this.email,
			password:this.password
		}

		data=JSON.stringify(data);
		console.log(data);
		fetch(this.api_url + '/users',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:data
		})
		.then(response=>response.json())
		.then(data=> {
			let session=new Session();
			session.user_id=data.id;
			session.startSession();

			window.location.href="hexa.html"
		})
	}

	async get(user_id){
		let api_url=this.api_url+'/users/'+user_id;

		let response = await fetch(api_url);
		let data= await response.json();

		return data;
		
	}

	edit(){
		let data={
			username: this.username,
			email: this.email
			};

			data=JSON.stringify(data);

			let session=new Session();
			sesion_id=session.getSession();

			fetch(this.api_url+'/users/'+sesion_id,{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body:data
			})
			.then(response=>response.json())
			.then(data=>{
				window.location.href='hexa.html'
			});
	}

	login(){
		fetch(this.api_url+"/users")
		.then(response=> response.json())
		.then(data=>{

			let login_successful=0;
			data.forEach(db_user=>{
				if(db_user.email===this.email && db_user.password===this.password)
				{
					let session=new Session();
					session.user_id=db_user.id;
					session.startSession();
					login_successful=1;
					window.location.href="hexa.html";

				}
			})

			if(login_successful===0){
				alert("Pogresna sifra ili email");
			}

		})
	}

	delete(){
		let session = new Session();
		sesion_id=session.getSession();

		fetch(this.api_url+'/users/'+sesion_id,{
			method: 'DELETE'
		})
		.then(response=> response.json())
		.then(data=>{
			let session = new Session();
			session.destroySession();
			window.location.href="/";
		})
	}
}