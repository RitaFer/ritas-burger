<template>
  <Navbar :logo="src_logo" :alt="alt_logo"/>
  <router-view/>
  <Footer/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      src_logo: "/img/logo.png",
      alt_logo: "Logotipo Ritas burger"
    }
  }
}
</script>

<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #app {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  .main-container {
    margin: 50px;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }

</style>
