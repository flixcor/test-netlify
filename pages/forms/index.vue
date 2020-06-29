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
      <open-question :status="statusObj.question1" label="Question 1" />
      <open-question :status="statusObj.question2" label="Question 2" />
      <multiple-choice
        :status="statusObj.question3"
        label="Question 3"
        :options="[20, 'Thirty', 22.5]"
      />
      <fieldset v-for="(group, index) in statusObj.recurringGroup" :key="index">
        <legend>Instance {{ index + 1 }} of recurring group</legend>
        <open-question :status="group.question4" label="Question 4" />
      </fieldset>
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
    const setup: string = highlight(prettyPrint())
    const formBuilder: IFormBuilder<IMyForm> = getBuilder()
    return {
      setup,
      formBuilder
    }
  },
  computed: {
    statusObj(): Record<any, any> {
      const formBuilder = this.formBuilder
      const groupBuilder = formBuilder.recurringGroup((x) => x.recurringGroup)
      const count = groupBuilder.count()
      const recurringGroup = [...Array(count).keys()].map((i) => ({
        question4: groupBuilder.getStatus(i, (x) => x.question4)
      }))

      return {
        question1: formBuilder.getStatus((x) => x.question1),
        question2: formBuilder.getStatus((x) => x.question2),
        question3: formBuilder.getStatus((x) => x.group1.question3),
        recurringGroup
      }
    },
    status(): string {
      return highlight(JSON.stringify(this.statusObj, null, 2))
    },
    state(): unknown {
      return this.formBuilder.getState()
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
