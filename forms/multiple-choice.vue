<template>
  <div v-if="isActive" class="field">
    <label
      v-if="label"
      :for="uuid"
      class="label"
      :required="status.$isRequired"
      >{{ label }}</label
    >
    <div class="control">
      <label v-for="(option, index) in options" :key="index" class="checkbox">
        <input
          :id="`${uuid}_${index}`"
          v-model="currentValue"
          :data-qa="`${status.$path}_${index}`"
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
    status: {
      type: Object,
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
      currentValue: this.status && this.status.$value
    }
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
  watch: {
    currentValue: {
      deep: true,
      handler(newVal: Multiple) {
        if (this.status) {
          this.status.$value = newVal
        }
      }
    }
  },
  mounted() {
    this.uuid = (this as any)._uid
  }
})
</script>
