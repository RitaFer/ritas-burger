<template>
  <div class="opcionais-container">
    <label class="opcionais-title" :for="id">{{ label }}</label>
    <div class="checkbox-container" 
    v-for="item in options" 
    :id="id"
    :key="item.id">
      <input type="checkbox" 
      :value="item.value"
      v-model="localValue">
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      localValue: this.modelValue
    }
  },
  watch: {
    localValue (value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style>
  .opcionais-container {
    display: flex;
    margin-bottom: 10px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .opcionais-title {
    width: 100%;
  }
  

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 10px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 10px;
  }
</style>