<template>
  <div v-if="status.active" class="field">
    <label v-if="label" :for="uuid" class="label">{{ label }}</label>
    <div class="control">
      <input
        :id="uuid"
        :value="status.value"
        :type="typeof status.value === 'number' ? 'number' : 'text'"
        :data-qa="status.path"
        class="input"
        @input="setValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IFormBuilder, IFormElementStatus, Form } from 'fluent-forms'
type Single = number | string

export default Vue.extend({
  props: {
    formBuilder: {
      type: Object,
      required: true
    } as PropOptions<IFormBuilder<Form>>,
    path: {
      type: Function,
      required: true
    } as PropOptions<(x: Form) => Single>,
    label: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return { uuid: '' }
  },
  computed: {
    status(): IFormElementStatus<Single> {
      return this.formBuilder.getStatus(this.path)
    }
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

      this.formBuilder.setValue(this.path, newValue)
    }
  }
})
</script>
