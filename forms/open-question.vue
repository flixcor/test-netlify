<template>
  <div v-if="state && state.$isActive" class="field">
    <label
      v-if="label"
      :for="state.$path"
      :class="{ label, required: state.$isRequired }"
      >{{ label }}</label
    >
    <div class="control">
      <input
        :id="state.$path"
        :value="state.$value"
        :type="typeof value === 'number' ? 'number' : 'text'"
        :data-path="state.$path"
        :name="state.$path"
        class="input"
        :required="state.$isRequired"
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
    state: {
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
    return { uuid: this.state.$path }
  },
  computed: {
    isRequired() {
      return this.state && this.state.$isRequired
    },
    isActive() {
      return this.state && this.state.$isActive
    },
    value() {
      return this.state && this.state.$value
    }
  },
  mounted() {
    this.uuid = (this as any)._uid
  },
  methods: {
    setValue(newValue: Single) {
      if (typeof this.state.$value === 'number') {
        const newNumVal = Number(newValue)

        if (isNaN(newNumVal)) return
        newValue = newNumVal
      }

      this.state.$value = newValue

      this.$emit('input')
    }
  }
})
</script>
