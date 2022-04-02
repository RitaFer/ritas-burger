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
    background-image: url(C:\Users\RitaF\Documents\projetos\ritas-burger\public\img\burger.jpg);
    background-size: cover;
  }
</style>
