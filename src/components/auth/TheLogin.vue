<template>
<div class="container mt-4 col-4 color=blue">
<form>
      <div class="mb-3">
        <label for="exampleDropdownFormEmail1" class="form-label"
          >Email address</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleDropdownFormEmail1"
          placeholder="email@example.com"
          v-model="login.email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleDropdownFormPassword1" class="form-label"
          >Password</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleDropdownFormPassword1"
          placeholder="Password"
          v-model="login.password"
        />
      </div>
      <!-- <pre>{{login}}</pre> -->
      <div class="mb-3">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="dropdownCheck" />
          <label class="form-check-label" for="dropdownCheck">
            Remember me
          </label>
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary" @click.prevent="loginUser">
        Sign in
      </button>
    </form>
</div>
    
 
</template>
<script>
import swal from "sweetalert"
export default {
  name: "TheLogin",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post('/api/user/login', this.login);
        console.log(response);
        let token = response.data.tokenReturn;
        let user = response.data.user;
        localStorage.setItem('jwt',token);
        localStorage.setItem('user',JSON.stringify(user));
        if(token){
            swal("Login Exitoso","Acceso concedido","success");
            this.$router.push('/home');
        } 
        
      }
       catch(e) {
          swal("Datos incorrectos!","Algo salió mal", "error");

      }
    } 
  }
};
</script> 
