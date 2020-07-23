<template>
  <div class="field">
    <button v-if="state.length === 0" type="button" @click="append()">
      +
    </button>
    <fieldset v-for="(group, index) in state" :key="index">
      <legend>Instance {{ index + 1 }} of recurring group</legend>
      <button type="button" @click="remove(index)">-</button>
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
