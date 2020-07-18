<template>
  <div v-if="status && status.$isActive" class="field">
    <label
      v-if="label"
      :for="uuid"
      class="label"
      :required="status.$isRequired"
      >{{ label }}</label
    >
    <div class="control">
      <input
        :id="uuid"
        :value="status.$value"
        :type="typeof value === 'number' ? 'number' : 'text'"
        :data-path="status.$path"
        class="input"
        :required="status.$isRequired"
        @input="setValue($event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IQuestionState } from 'fluent-forms'
type Single = number | string

export default Vue.extend({
  props: {
    status: {
      type: Object,
      required: true
    } as PropOptions<IQuestionState<Single>>,
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
    isRequired() {
      return this.status && this.status.$isRequired
    },
    isActive() {
      return this.status && this.status.$isActive
    },
    value() {
      return this.status && this.status.$value
    }
  },
  mounted() {
    this.uuid = (this as any)._uid
  },
  methods: {
    setValue(newValue: Single) {
      if (typeof this.status.$value === 'number') {
        const newNumVal = Number(newValue)

        if (isNaN(newNumVal)) return
        newValue = newNumVal
      }

      this.status.$value = newValue

      this.$emit('input')
    }
  }
})
</script>
