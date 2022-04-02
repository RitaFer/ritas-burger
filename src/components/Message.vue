<template>
  <div class="message-container">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    name: "Message",
    props: {
      msg: String
    }
  }
</script>

<style scoped>
  .message-container {
    color: #048500;
    background-color: #ccffd9;
    border: 2px solid #b8ffca;
    border-radius: 5px;
    padding: 10px;
    max-width: 80vw;
    margin: 30px auto;
    text-align: center;
  }
</style>