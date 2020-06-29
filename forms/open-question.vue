<template>
  <div v-if="status.active" class="field">
    <label v-if="label" :for="uuid" class="label" :required="status.required">{{
      label
    }}</label>
    <div class="control">
      <input
        :id="uuid"
        :value="status.value"
        :type="typeof status.value === 'number' ? 'number' : 'text'"
        :data-path="status.path"
        class="input"
        :required="status.required"
        @input="setValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IFormQuestionStatus } from 'fluent-forms'
type Single = number | string

export default Vue.extend({
  props: {
    status: {
      type: Object,
      required: true
    } as PropOptions<IFormQuestionStatus<Single>>,
    label: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return { uuid: '' }
  },
  mounted() {
    this.uuid = (this as any)._uid
  },
  methods: {
    setValue(newValue: Single) {
      if (typeof this.status.value === 'number') {
        const newNumVal = Number(newValue)

        if (isNaN(newNumVal)) return
        newValue = newNumVal
      }

      this.status.set(newValue)
    }
  }
})
</script>
