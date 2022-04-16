<template>
  <div class="input-container">
    <label>
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      required
      />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    modelValue: {
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 5px 10px;
  }

  input {
    padding: 5px 10px;
  }

  label {
    font-weight: bold;
    margin-bottom: 10px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #fcba0398;
  }
</style>