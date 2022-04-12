<template>
  <div class="input-container">
    <label>
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder" 
      @input="$emit('updateValue', $event.target.value)"
      />
  </div>
</template>

<script>
export default {
  props: {
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