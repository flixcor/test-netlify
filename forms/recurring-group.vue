<template>
  <div :key="key">
    <button v-if="state.length === 0" type="button" @click="append()">
      +
    </button>
    <fieldset v-for="(group, index) in state" :key="index">
      <button type="button" @click="remove(index)">-</button>
      <legend>Instance {{ index + 1 }} of recurring group</legend>
      <slot :group="group"></slot>
      <button type="button" @click="append()">+</button>
    </fieldset>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IArrayOperations, FormGroup } from 'fluent-forms'
export default Vue.extend({
  props: {
    state: {
      type: [Object, Array],
      required: true
    } as PropOptions<[] & IArrayOperations<any>>,
    createEmpty: {
      type: Function,
      default: () => ({})
    } as PropOptions<() => FormGroup>
  },
  data() {
    return {
      key: 0
    }
  },
  methods: {
    remove(i: number) {
      this.state.$remove(i)
      // this.key++
    },
    append() {
      this.state.$append(this.createEmpty())
      // this.key++
    }
  }
})
</script>
