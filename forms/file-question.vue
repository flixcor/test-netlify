w<template>
  <div v-if="state.$isActive" class="field">
    <label
      v-if="label"
      :class="{ label, required: state.$isRequired }"
      :for="state.$path"
      >{{ label }}</label
    >
    <div class="control">
      <input
        :id="state.$path"
        type="file"
        :name="state.$path"
        :required="state.$isRequired"
        @change="setUrl"
      />
    </div>
    <a :href="state.$value" target="_blank" rel="noopener noreferrer"
      >{{ fileName }}
    </a>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IQuestionState } from 'fluent-forms'
export default Vue.extend({
  props: {
    state: {
      type: Object,
      required: true
    } as PropOptions<IQuestionState<URL>>,
    label: {
      type: String,
      default: null
    }
  },
  data() {
    const url = this.state.$value
    const urlString = url.toString()
    const split = urlString.split('/')
    const last = split.length && split[split.length - 1]

    const fileName = last || 'File'

    return {
      fileName,
      url
    }
  },
  methods: {
    setUrl(e: Event) {
      const target = e.target as HTMLInputElement
      const file = target?.files?.item(0)
      if (file) {
        const url = (URL.createObjectURL(file) as unknown) as URL
        this.fileName = file.name
        this.state.$value = url
        this.url = url
      }
    }
  }
})

function isUrl(value: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(value)
}
</script>
