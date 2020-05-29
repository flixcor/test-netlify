<template>
  <div class="flex">
    <section>
      <h2 class="title">Setup</h2>
      <pre v-highlightjs="setup">
        <code class="typescript">
        </code>
      </pre>
    </section>
    <section>
      <h2 class="title">Questions</h2>
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
      <h2 class="title">Status</h2>
      <pre v-highlightjs="status">
        <code class="javascript">
        </code>
      </pre>
    </section>
  </div>
</template>

<script lang="ts">
import 'highlight.js/styles/dracula.css'
import Vue from 'vue'
import { IFormBuilder } from '~/forms'
import Question from '~/forms/question.vue'
import { IMyForm, getBuilder, prettyPrint } from '~/forms/example'

export default Vue.extend({
  components: {
    Question
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
        2
      )
    }
  }
})
</script>
<style>
.flex {
  display: flex;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-between;
}

pre {
  -webkit-overflow-scrolling: inherit;
  background-color: inherit;
  color: inherit;
  font-size: inherit;
  overflow-x: inherit;
  padding: inherit;
  word-wrap: inherit;
}

@media only screen and (min-width: 1644px) {
  .container {
    max-width: 1380px;
  }
}
</style>
