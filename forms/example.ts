import { createFormBuilder, IFormBuilder, FormConfig } from 'fluent-forms'

export type IMyForm = {
  question1: number
  question2: string
  group1: IGroup1
  recurringGroup: Array<IGroup2>
  file: URL
}

export type IGroup1 = {
  question3: (number | string)[]
}

export type IGroup2 = {
  question4: string
}

export function getBuilder(): IFormBuilder<IMyForm> {
  const myForm: IMyForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: [20, 'Thirty']
    },
    recurringGroup: [
      {
        question4: 'example 1'
      },
      {
        question4: 'example 2'
      }
    ],
    file: new URL('https://www.google.com')
  }

  const config: FormConfig<IMyForm> = {
    question1: {
      $isRequired: true
    },
    question2: {
      $isActive(form) {
        return form.question1.$isActiveAnd((x) => x > 3)
      }
    },
    group1: {
      $isActive(form) {
        return form.question1.$isActiveAnd((x) => x <= 3)
      },
      question3: {
        $isActive: true
      }
    },
    recurringGroup: [
      {
        question4: {
          $isRequired(_, i) {
            return i === 0
          }
        }
      }
    ],
    file: {}
  }

  const builder = createFormBuilder<IMyForm>(myForm, config)

  return builder
}

export function prettyPrint() {
  return `
  import { createFormBuilder } from 'fluent-forms'

  const myForm: IMyForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: [20, 'Thirty']
    },
    recurringGroup: [
      {
        question4: 'example 1'
      },
      {
        question4: 'example 2'
      }
    ],
    file: new URL('https://www.google.com')
  }

  const configurator: FormConfig<IMyForm> = {
    question1: {
      $isRequired: true
    },
    question2: {
      $isActive(form) {
        return form.question1.$isActiveAnd((x) => x > 3)
      }
    },
    group1: {
      $isActive(form) {
        return form.question1.$isActiveAnd((x) => x <= 3)
      },
      question3: {
        $isActive: true
      }
    },
    recurringGroup: [
      {
        question4: {
          $isRequired(_, i) {
            return i === 0
          }
        }
      }
    ],
    file: {}
  }

  const builder = createFormBuilder(myForm, configurator)
  `
}
