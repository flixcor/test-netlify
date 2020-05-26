<template>
  <div>
    <question
      :form-builder="formBuilder"
      :path="(x) => x.question1"
      label="question1"
      type="number"
    />
    <question
      :form-builder="formBuilder"
      :path="(x) => x.question2"
      label="question2"
      type="text"
    />
    <question
      :form-builder="formBuilder"
      :path="(x) => x.group1.question3"
      label="question3"
      type="number"
    />
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
    return {
      formBuilder
    }
  }
})
</script>
