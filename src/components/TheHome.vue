<template>
  <div>
    <div>
      <div class="container">
        <h1>Bienvenido a mi sitio web!!!</h1>
        <button
           type="submit"
          class="btn btn-default navbar-btn"
          @click.prevent="logOut"
        >
          Salir del sitio
        </button>
        <button
          type="submit"
          class="btn btn-default navbar-btn"
          @click.prevent=" getUserDetails"
        >
          Get User
        </button>
      </div>
      <div class="container">
        <p>{{ user.username }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.rol }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },

  methods: {
    getUserDetails() {
      let user = localStorage.getItem('user');
      let token = localStorage.getItem('jwt');
      console.log(JSON.parse(user)) ;

      if (token) {
        this.user = JSON.parse(user);
      }
    },
    logOut() {
      //Elimina Token y usuario del localStorage al salir del sitio
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      //Devuelve la ventana a la condicion inicial.
      this.$router.push("/");
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>