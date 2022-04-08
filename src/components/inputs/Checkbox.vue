<template>
  <div class="opcionais-container">
    <label class="opcionais-title" for="spices">
      Tempero
    </label>
    <div class="checkbox-container" v-for="spicesRequest in spices" :key="spicesRequest.id">
      <input type="checkbox" name="spicesRequest" :value="spicesRequest.type" v-model="checkedSpices">
        <span>{{ spicesRequest.type }}</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>