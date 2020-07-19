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
      <form
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="submit"
      >
        <open-question :state="question1" label="Question 1" />
        <open-question :state="question2" label="Question 2" />
        <multiple-choice
          :state="question3"
          label="Question 3"
          :options="[20, 'Thirty', 22.5]"
        />
        <recurring-group
          :state="formState.recurringGroup"
          :create-empty="() => ({ question4: '' })"
        >
          <template v-slot="{ group }">
            <open-question :state="group.question4" label="Question 4" />
          </template>
        </recurring-group>
        <button type="submit">Submit</button>
      </form>
    </section>
    <section>
      <h2 class="title">State</h2>
      <pre>
        <code class="javascript hljs" v-html="state">
        </code>
      </pre>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormConfig, IQuestionState, FormQuestion, Form } from 'fluent-forms'
import { OpenQuestion, MultipleChoice, RecurringGroup } from '~/forms'
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
    MultipleChoice,
    RecurringGroup
  },
  data() {
    const builder = getBuilder()
    const form = builder.getForm()
    const setup: string = highlight(prettyPrint())
    const formConfig: FormConfig<IMyForm> = builder.getConfigurator()
    const formState = builder.getState()
    const {
      question1,
      question2,
      group1: { question3 }
    } = formState
    return {
      builder,
      setup,
      form,
      key: 0,
      formConfig,
      formState,
      question1,
      question2,
      question3
    }
  },
  computed: {
    state(): string {
      const {
        question1,
        question2,
        group1: { question3 },
        recurringGroup
      } = this.formState
      const ret = {
        question1: getState(question1),
        question2: getState(question2),
        group1: {
          $isRequired: this.formState.group1.$isRequired,
          $isActive: this.formState.group1.$isActive,
          question3: getState(question3)
        },
        recurringGroup: recurringGroup.map(
          ({ $path, $isActive, $isRequired, question4 }) => ({
            $path,
            $isActive,
            $isRequired,
            question4: getState(question4)
          })
        )
      }
      return highlight(JSON.stringify(ret, null, 2))
    }
  },
  methods: {
    submit(e: Event) {
      const form = e.target as any

      if (form.checkValidity()) {
        const formData = JSON.stringify(serializeArray(form))
        alert('Form data: \n\n' + formData)
      }
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

/*!
 * Serialize all form data into an array of key/value pairs
 * (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {Array}       The serialized form data
 */
function serializeArray(form: Form) {
  const arr: unknown[] = []
  Array.prototype.slice.call(form.elements).forEach(function(field) {
    if (
      !field.name ||
      field.disabled ||
      ['file', 'reset', 'submit', 'button'].includes(field.type)
    )
      return
    if (field.type === 'select-multiple') {
      Array.prototype.slice.call(field.options).forEach(function(option) {
        if (!option.selected) return
        arr.push({
          name: field.name,
          value: option.value
        })
      })
      return
    }
    if (['checkbox', 'radio'].includes(field.type) && !field.checked) return
    arr.push({
      name: field.name,
      value: field.value
    })
  })
  return arr
}
</script>

<style>
.flex {
  display: flex;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.flex section {
  flex: 0 1 150px;
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
textarea,
fieldset {
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}

fieldset {
  min-width: 300px;
  padding: 20px;
}
</style>
