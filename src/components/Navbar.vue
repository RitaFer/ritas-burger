<template>
  <div id="nav">
    <router-link to="/" id="logo-url">
      <img :src="logo" :alt="alt" id="logo">
    </router-link>
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/requests">
      Pedidos
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  props: ["logo", "alt"]
}
</script>
<style>
  #nav {
    background-color: #222;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
  }

  #nav #logo-url {
    margin: auto;
    margin-left: 0;
  }

  #logo {
    width: 40px;
    height: 40px;
  }

  #nav a {
    color: #FCBA03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
  }

  #nav a:hover {
    color: #FFF;
  }
</style>