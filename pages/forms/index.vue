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
      <open-question :status="formState.question1" label="Question 1" />
      <open-question :status="formState.question2" label="Question 2" />
      <multiple-choice
        :status="formState.group1.question3"
        label="Question 3"
        :options="[20, 'Thirty', 22.5]"
      />
      <fieldset v-for="(group, index) in formState.recurringGroup" :key="index">
        <legend>Instance {{ index + 1 }} of recurring group</legend>
        <open-question :status="group.question4" label="Question 4" />
      </fieldset>
    </section>
    <section>
      <h2 class="title">State</h2>
      <pre>
        <code class="javascript hljs" v-html="status">
        </code>
      </pre>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  FormState,
  FormConfig,
  IQuestionState,
  FormQuestion
} from 'fluent-forms'
import { OpenQuestion, MultipleChoice } from '~/forms'
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
    OpenQuestion,
    MultipleChoice
  },
  data() {
    const builder = getBuilder()
    const setup: string = highlight(prettyPrint())
    const formState: FormState<IMyForm> = builder.getState()
    const formConfig: FormConfig<IMyForm> = builder.getConfigurator()
    // const { $isActive, $isRequired, $value } = formState.group1.question3
    return {
      setup,
      formState,
      formConfig,
      group1: formState.group1?.$isActive,
      question1: formState.question1?.$isActive,
      question2: formState.question2?.$isActive,
      question3: formState.group1?.question3?.$isActive,
      group2: formState.recurringGroup[1]?.question4
    }
  },
  computed: {
    status(): string {
      const {
        question1,
        question2,
        group1: { question3 },
        recurringGroup: {
          0: { $isActive: ia1, $isRequired: ir1, question4: q41 },
          1: { $isActive: ia2, $isRequired: ir2, question4: q42 }
        }
      } = this.formState
      const ret = {
        question1: getState(question1),
        question2: getState(question2),
        group1: {
          $isRequired: this.formState.group1.$isRequired,
          $isActive: this.formState.group1.$isActive,
          question3: getState(question3)
        },
        recurringGroup: [
          { $isActive: ia1, $isRequired: ir1, question4: getState(q41) },
          { $isActive: ia2, $isRequired: ir2, question4: getState(q42) }
        ]
      }
      return highlight(JSON.stringify(ret, null, 2))
    }
  }
})

const getState = ({
  $path,
  $isActive,
  $isRequired,
  $value
}: IQuestionState<FormQuestion>) => {
  return { $path, $isActive, $isRequired, $value }
}
</script>
<style>
.flex {
  display: flex;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.field:not(:last-child),
fieldset:not(:last-child) {
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

.label:not(:last-child) {
  margin-bottom: 0.5em;
}

.label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
}

.label[required]:after {
  content: ' *';
  color: red;
}

.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: left;
}

input:not([type='checkbox']) {
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

.checkbox,
.radio {
  cursor: pointer;
  display: block;
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
