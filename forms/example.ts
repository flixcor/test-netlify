import {
  createFormBuilder,
  Form,
  FormGroup,
  RecurringGroup,
  IFormBuilder
} from 'fluent-forms'

export interface IMyForm extends Form {
  question1: number
  question2: string
  group1: IGroup1
  recurringGroup: RecurringGroup<IGroup2>
}

interface IGroup1 extends FormGroup {
  question3: (number | string)[]
}

export interface IGroup2 extends FormGroup {
  question4: string
}

export function getBuilder(): IFormBuilder<IMyForm> {
  const myForm: IMyForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: [20]
    },
    recurringGroup: [
      {
        question4: 'example 1'
      },
      {
        question4: 'example 2'
      }
    ]
  }

  const builder = createFormBuilder(myForm)
  const configurator = builder.getConfigurator()

  configurator.question1.$isRequired(() => true)

  configurator.question2
    .$isActive((form) => {
      const { $value, $isActive } = form.question1
      return $isActive && $value > 3
    })
    .$isRequired(() => false)

  configurator.group1.$isActive((form) => {
    const { $value, $isActive } = form.question1
    return $isActive && $value <= 3
  })

  configurator.group1.question3.$isActive(() => true)

  configurator.recurringGroup.question4.$isRequired((_, i) => i === 0)

  return builder
}

export function prettyPrint() {
  return `
  import { createFormBuilder } from 'fluent-forms'

  const myForm: IMyForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: [20]
    },
    recurringGroup: [
      {
        question4: 'example 1'
      },
      {
        question4: 'example 2'
      }
    ]
  }

  const builder = createFormBuilder(myForm)
  const configurator = builder.getConfigurator()

  configurator.question1.$isRequired(() => true)

  configurator.question2
    .$isActive((form) => {
      const { $value, $isActive } = form.question1
      return $isActive && $value > 3
    })
    .$isRequired(() => false)

  configurator.group1.$isActive((form) => {
    const { $value, $isActive } = form.question1
    return $isActive && $value <= 3
  })

  configurator.group1.question3.$isActive(() => true)

  configurator.recurringGroup.question4.$isRequired((_, i) => i === 0)
  `
}
