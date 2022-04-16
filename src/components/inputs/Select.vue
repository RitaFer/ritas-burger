<template>
  <div class="custom-select">
    <label :for="id">{{ label }}</label>
    <select :id="id" 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    required>
      <option v-for="item in options"
      :key="item.id" 
      :value="item.type"
      >
        {{ item.type }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .custom-select label {
    display: block;
  }
  .custom-select select {
    display: block;
    width: 100%;
    padding: 5px 10px;
  }
</style>