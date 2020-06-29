<template>
  <div v-if="status.active" class="field">
    <label v-if="label" :for="uuid" class="label" :required="status.required">{{
      label
    }}</label>
    <div class="control">
      <label v-for="(option, index) in options" :key="index" class="checkbox">
        <input
          :id="`${uuid}_${index}`"
          v-model="currentValue"
          :data-qa="`${status.path}_${index}`"
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
import { IFormQuestionStatus } from 'fluent-forms'

type Multiple = (string | number)[]

export default Vue.extend({
  props: {
    status: {
      type: Object,
      required: true
    } as PropOptions<IFormQuestionStatus<Multiple>>,
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
      currentValue: this.status.value
    }
  },
  watch: {
    currentValue: {
      deep: true,
      handler(newVal: Multiple) {
        this.status.set(newVal)
      }
    }
  },
  mounted() {
    this.uuid = (this as any)._uid
  }
})
</script>
