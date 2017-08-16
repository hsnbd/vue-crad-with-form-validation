//vue validator plug-in
Vue.use(VeeValidate);

var app = new Vue({
	el: "#root",
	data : {
		showingAddModel: false,
		showingEditModel: false,
		showingDeleteModel: false,
		errorMessage: "",
		successMessage: "",
		users: [],
		newUser: {username: "", email: "", mobile: ""},
		clickedUser: {},
	},

	mounted: function(){
		// console.log("mounted");
		this.getAllUsers();
	},

	methods: {
		getAllUsers: function(){
			axios.get("/api.php?action=read")
			.then(function(response){
				// console.log(response);
				if(response.data.error){
					app.errorMessage = response.data.message
				} else {
					app.users = response.data.users;
				}
			});
		},
		saveUser: function(){
			var formData = app.toFormData(app.newUser);
			axios.post("/api.php?action=create", formData)
			.then(function(response){
				if(response.data.error){
					app.errorMessage = response.data.message;
					app.newUser;
				} else{
					app.successMessage = response.data.message;
					app.showingAddModel = false;
					app.newUser = {username: "", email: "", mobile: ""};
					app.getAllUsers();
				}
			})
		},
		selectUser(user){
			app.clickedUser = user;
		},

		updateUser: function(){
			var formData = app.toFormData(app.clickedUser);

			axios.post("/api.php?action=update", formData)
			.then(function(response){
				if(response.data.error){
					app.errorMessage = response.data.message;
					app.clickedUser;
				} else{
					// setTimeout(function () {  } , 1000);
					app.successMessage = response.data.message;
					app.showingEditModel = false;
					app.clickedUser = {};
					app.getAllUsers();
				}
			});
		},

		deleteUser: function(){
			var formData = app.toFormData(app.clickedUser);

			axios.post("/api.php?action=delete", formData)
			.then(function(response){
				console.log(response);
				app.clickedUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message;
				} else{
					app.successMessage = response.data.message;
					app.getAllUsers();
				}
			});
		},

		toFormData: function(obj){
			var form_data = new FormData();
			for(var key in obj){
				form_data.append(key, obj[key]);
			}
			return form_data;
		},

		clearMessage: function () {
			app.errorMessage = "";
			app.successMessage = "";
		}


	}
});