<template>
  <div class="flex">
    <section>
      <h2 class="title">Setup</h2>
      <pre>
        <code class="language-typescript" v-html="setup" />
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
        <file-question :state="formState.file" label="File" />
        <button type="submit">Submit</button>
      </form>
    </section>
    <section>
      <h2 class="title">State</h2>
      <pre>
        <code class="language-typescript" v-html="state">
        </code>
      </pre>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormConfig, IQuestionState, FormQuestion, Form } from 'fluent-forms'
import Prism from 'prismjs'
require('prismjs/components/prism-typescript')
import {
  OpenQuestion,
  MultipleChoice,
  RecurringGroup,
  FileQuestion
} from '~/forms'
import { IMyForm, getBuilder, prettyPrint } from '~/forms/example'

const highlight = (s: string) =>
  Prism.highlight(s, Prism.languages.typescript, 'typescript')

export default Vue.extend({
  components: {
    OpenQuestion,
    MultipleChoice,
    RecurringGroup,
    FileQuestion
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
        recurringGroup,
        file
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
        ),
        file: getState(file)
      }
      return highlight('\n' + JSON.stringify(ret, null, 2))
    }
  },
  mounted() {
    Prism.highlightAll(false)
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
