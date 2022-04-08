<template>
  <div class="input-container">
    <label for="breadType">
      Pão
    </label>
    <select name="breadTypeRequest" id="breadTypeRequest" v-model="breadTypeRequest">
      <option v-for="breadTypeRequest in breadType" :key="breadTypeRequest.id" :value="breadTypeRequest.type">{{ breadTypeRequest.type }}</option>
    </select>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>