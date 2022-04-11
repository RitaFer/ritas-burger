<template>
  <div class="input-container">
    <label>
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder" 
      :value="textInserted"
      @input="$emit('updateValue', $event.target.value)"
      />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: ""
    },
    name: {
      type: String,
      required: true,
      default: ""
    },
    type: {
      type: String,
      required: true,
      default: "text"
    },
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
  }
}
</script>

<style>

</style>