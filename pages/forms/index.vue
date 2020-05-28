<template>
  <div class="flex">
    <section>
      <label for="setupBlock" class="label">Setup</label>
      <vue-code-highlight id="setupBlock" class="language-typescript">{{
        setup
      }}</vue-code-highlight>
    </section>
    <section>
      <question
        :form-builder="formBuilder"
        :path="question1"
        label="Question 1"
        type="number"
      />
      <question
        :form-builder="formBuilder"
        :path="question2"
        label="Question 2"
        type="text"
      />
      <question
        :form-builder="formBuilder"
        :path="question3"
        label="Question 3"
        type="number"
      />
    </section>
    <section>
      <label for="statusBlock" class="label">Status per question</label>
      <vue-code-highlight id="statusBlock">{{ status }}</vue-code-highlight>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { component as VueCodeHighlight } from 'vue-code-highlight'
import { IFormBuilder } from '~/forms'
import Question from '~/forms/question.vue'
import { IMyForm, getBuilder, prettyPrint } from '~/forms/example'
import 'vue-code-highlight/themes/duotone-sea.css'
import 'vue-code-highlight/themes/window.css'
import 'prism-es6/components/prism-markup-templating'
import 'prism-es6/components/prism-typescript'

export default Vue.extend({
  components: {
    Question,
    VueCodeHighlight
  },
  data() {
    const formBuilder: IFormBuilder<IMyForm> = getBuilder()
    const question1: (x: IMyForm) => number = (x) => x.question1
    const question2: (x: IMyForm) => string = (x) => x.question2
    const question3: (x: IMyForm) => number = (x) => x.group1.question3

    const setup = prettyPrint()

    return {
      formBuilder,
      question1,
      question2,
      question3,
      setup
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
code .number {
  align-items: inherit;
  background-color: inherit;
  border-radius: inherit;
  display: inherit;
  font-size: inherit;
  height: inherit;
  justify-content: inherit;
  margin-right: inherit;
  min-width: inherit;
  padding: inherit;
  text-align: inherit;
  vertical-align: inherit;
}

.flex {
  display: flex;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media only screen and (min-width: 1644px) {
  .container {
    max-width: 1380px;
  }
}
</style>
