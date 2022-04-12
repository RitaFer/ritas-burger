<template>
  <div id='home' class="main-container">
    <BurgerForm />
  </div>
</template>

<script>
import BurgerForm from "../components/BurgerForm.vue"

export default {
  name: "Home",
  components: {
    BurgerForm
  }
}
</script>

<style scoped>
  #home {
    background-image: url(https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    background-size: cover;
  }
</style>
