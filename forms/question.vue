<template>
  <div v-show="status.active" class="field">
    <label v-if="label" :for="uuid" class="label">{{ label }}</label>
    <div class="control">
      <input
        :id="uuid"
        :value="status.value"
        :type="type"
        class="input"
        @input="setValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IFormBuilder, FormQuestion, IFormElementStatus } from 'fluent-forms'

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
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    }
  },
  data() {
    return { uuid: '' }
  },
  computed: {
    status(): IFormElementStatus {
      return this.formBuilder.getStatus(this.path)
    }
  },
  mounted() {
    this.uuid = (this as any)._uid
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
