<template>
  <div class="flex">
    <section>
      <h2 class="title">Setup</h2>
      <pre>
        <code class="typescript hljs" v-html="setup">
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
      <pre>
        <code class="javascript hljs" v-html="status">
        </code>
      </pre>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IFormBuilder } from 'fluent-forms'
import Question from '~/forms/question.vue'
import { IMyForm, getBuilder, prettyPrint } from '~/forms/example'

const hljs = require('highlight.js/lib/core') // require only the core library
// separately require languages
hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)

const highlight = (x: string) => hljs.highlight('javascript', x).value

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
      question3,
      setup: highlight(prettyPrint())
    }
  },
  computed: {
    status(): string {
      return highlight(
        JSON.stringify(
          {
            question1: this.formBuilder.getStatus(this.question1),
            question2: this.formBuilder.getStatus(this.question2),
            question3: this.formBuilder.getStatus(this.question3)
          },
          null,
          2
        )
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

.field:not(:last-child) {
  margin-bottom: 0.75rem;
}

h2 {
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
  word-break: break-word;
  margin-bottom: 1rem;
}

label:not(:last-child) {
  margin-bottom: 0.5em;
}

label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
}

.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: left;
}

input {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  border-radius: 4px;
  color: #363636;
  -webkit-appearance: none;
  align-items: center;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
}

input:focus,
input:active {
  border-color: #3273dc;
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  outline: none;
}

body,
button,
input,
select,
textarea {
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

.container {
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (min-width: 1044px) {
  .container {
    max-width: 980px;
  }
}

@media only screen and (min-width: 1344px) {
  .container {
    max-width: 1280px;
  }
}

@media only screen and (min-width: 1644px) {
  .container {
    max-width: 1580px;
  }
}
</style>
