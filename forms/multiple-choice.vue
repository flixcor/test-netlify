<template>
  <div v-if="isActive" class="field">
    <label
      v-if="label"
      :for="state.$path"
      :class="{ label, required: state.$isRequired }"
      >{{ label }}</label
    >
    <div class="control">
      <label v-for="(option, index) in options" :key="index" class="checkbox">
        <input
          :id="`${state.$path}_${index}`"
          v-model="currentValue"
          :data-path="`${state.$path}_${index}`"
          :name="state.$path"
          type="checkbox"
          :value="option"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IQuestionState } from 'fluent-forms'

type Multiple = (string | number)[]

export default Vue.extend({
  props: {
    state: {
      type: [Object, Array],
      required: true
    } as PropOptions<IQuestionState<Multiple>>,
    label: {
      type: String,
      required: false,
      default: null
    },
    options: {
      type: Array,
      required: true
    } as PropOptions<Multiple>
  },
  data() {
    return {
      uuid: '',
      currentValue: this.state && this.state.$value
    }
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
  watch: {
    currentValue: {
      deep: true,
      handler(newVal: Multiple) {
        if (this.state) {
          this.state.$value = newVal
        }
      }
    }
  },
  mounted() {
    this.uuid = (this as any)._uid
  }
})
</script>
