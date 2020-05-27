<template>
  <div>
    <question
      :form-builder="formBuilder"
      :path="question1"
      label="question1"
      type="number"
    />
    <question
      :form-builder="formBuilder"
      :path="question2"
      label="question2"
      type="text"
    />
    <question
      :form-builder="formBuilder"
      :path="question3"
      label="question3"
      type="number"
    />
    <label for="codeBlock" class="label">Status per question</label>
    <code id="codeBlock">{{ status }}</code>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IFormBuilder } from '~/forms'
import Question from '~/forms/question.vue'
import { IMyForm, getBuilder } from '~/forms/example'

export default Vue.extend({
  components: {
    Question
  },
  data() {
    const formBuilder: IFormBuilder<IMyForm> = getBuilder()
    const question1: (x: IMyForm) => number = (x) => x.question1
    const question2: (x: IMyForm) => string = (x) => x.question2
    const question3: (x: IMyForm) => number = (x) => x.group1.question3

    return {
      formBuilder,
      question1,
      question2,
      question3
    }
  },
  computed: {
    status(): string {
      return JSON.stringify(
        {
          question1: this.formBuilder.getStatus(this.question1),
          question2: this.formBuilder.getStatus(this.question2),
          question3: this.formBuilder.getStatus(this.question3)
        },
        null,
        4
      )
    }
  }
})
</script>

<style>
code {
  display: block;
  white-space: pre-wrap;
}
</style>
