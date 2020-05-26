<template>
  <div v-if="status.active">
    <label v-if="label" :for="uuid">{{ label }}</label>
    <input
      :id="uuid"
      :value="status.value"
      @input="setValue($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IFormBuilder, FormQuestion, IFormElementStatus } from './index'

function createUUID() {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export default Vue.extend({
  props: {
    formBuilder: {
      type: Object,
      required: true
    } as PropOptions<IFormBuilder<any>>,
    path: {
      type: Function,
      required: true
    } as PropOptions<(x: any) => FormQuestion>,
    label: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return { uuid: createUUID() }
  },
  computed: {
    status(): IFormElementStatus {
      return this.formBuilder.getStatus(this.path)
    }
  },
  methods: {
    setValue(newValue: FormQuestion) {
      const newNumVal = Number(newValue)
      const numVal = Number(this.status.value)

      if (!isNaN(numVal)) {
        if (isNaN(newNumVal)) return
        newValue = newNumVal
      }

      this.formBuilder.setValue(this.path, newValue)
    }
  }
})
</script>
