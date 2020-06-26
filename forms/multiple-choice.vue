<template>
  <div v-if="status.active" class="field">
    <label v-if="label" :for="uuid" class="label">{{ label }}</label>
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
import { IFormBuilder, IFormElementStatus, Form } from 'fluent-forms'

type Multiple = (string | number)[]

export default Vue.extend({
  props: {
    formBuilder: {
      type: Object,
      required: true
    } as PropOptions<IFormBuilder<Form>>,
    path: {
      type: Function,
      required: true
    } as PropOptions<(x: Form) => Multiple>,
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
      currentValue: this.formBuilder.getStatus(this.path).value as Multiple
    }
  },
  computed: {
    status(): IFormElementStatus<Multiple> {
      return this.formBuilder.getStatus(this.path)
    }
  },
  watch: {
    currentValue: {
      deep: true,
      handler(newVal: Multiple) {
        this.formBuilder.setValue(this.path, newVal)
      }
    }
  },
  mounted() {
    this.uuid = (this as any)._uid
  }
})
</script>
