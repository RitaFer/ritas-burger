<template>
  <div class="input-container">
    <label>
      {{ label }}
    </label>
    <input 
      :placeholder="placeholder" 
      v-model="nameRequest"
      />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
      default: ""
    },
    label: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      nameRequest: ''
    }
  }
}
</script>

<style>

</style>