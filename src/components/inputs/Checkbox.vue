<template>
  <b-form-checkbox 
    :id="id"
    :ref="`${id}-ref`"
    size="lg" 
    class="custom-checkbox"
    v-model="valueInput"
    >
    <span class="body-1">{{ getConfig.label }}</span>
  </b-form-checkbox>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    getConfig () {
      return {
        ...this.defaultConfig,
        ...this.config,
        label: this.label ?? this.config?.label ?? this.defaultConfig?.label
      }
    }
  }
}
</script>