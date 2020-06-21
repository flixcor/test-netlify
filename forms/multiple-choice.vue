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
import {
  IFormBuilder,
  FormQuestion,
  IFormElementStatus,
  FormElement
} from 'fluent-forms'

type Multiple = (string|number)[]

export default Vue.extend({
  props: {
    formBuilder: {
      type: Object,
      required: true
    } as PropOptions<IFormBuilder<any>>,
    path: {
      type: Function,
      required: true
    } as PropOptions<(x: any) => Multiple>,
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
      currentValue: (<Multiple>this.formBuilder.getStatus(this.path).value)
    }
  },
  watch: {
    currentValue: {
      deep: true,
      handler (newVal) {
        (<any>this).setValue(newVal)
      }
    }
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
    setValue(newValue: Multiple) {
      const path = <(x: any) => FormQuestion>this.path
      const val = <FormQuestion> newValue
      this.formBuilder.setValue(path, val)
    }
  }
})
</script>
