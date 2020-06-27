import { createFormBuilder, Form, FormGroup, IFormBuilder } from 'fluent-forms'

export interface IMyForm extends Form {
  question1: number
  question2: string
  group1: IGroup1
  recurringGroup: IGroup2[]
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
      question3: [22.5]
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

  builder.question((x) => x.question1).isRequired(() => true)

  builder
    .question((x) => x.question2)
    .isActive((evaluator) =>
      evaluator.evaluate(
        // the path to the question we want to evaluate
        (form) => form.question1,
        // the actual evaluation
        (question1) => question1 > 3
      )
    )
    .isRequired(() => false)

  builder
    .group((x) => x.group1)
    .isActive((evaluator) =>
      evaluator.evaluate(
        // the path to the question we want to evaluate
        (form) => form.question1,
        // the actual evaluation
        (question1) => question1 <= 3
      )
    )

  builder.question((x) => x.group1.question3).isActive(() => true)

  const recurringGroupBuilder = builder.recurringGroup((x) => x.recurringGroup)

  recurringGroupBuilder
    .question((y) => y.question4)
    .isRequired((index) => index === 0)

  return builder
}

export function prettyPrint() {
  return `
  import { createFormBuilder } from 'fluent-forms'

  const myForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: [22.5]
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

  builder.question((x) => x.question1).isRequired(() => true)

  builder
    .question((x) => x.question2)
    .isActive((evaluator) =>
      evaluator.evaluate(
        // the path to the question we want to evaluate
        (form) => form.question1,
        // the actual evaluation
        (question1) => question1 > 3
      )
    )
    .isRequired(() => false)

  builder
    .group((x) => x.group1)
    .isActive((evaluator) =>
      evaluator.evaluate(
        // the path to the question we want to evaluate
        (form) => form.question1,
        // the actual evaluation
        (question1) => question1 <= 3
      )
    )

  builder.question((x) => x.group1.question3).isActive(() => true)

  const recurringGroupBuilder = builder.recurringGroup((x) => x.recurringGroup)

  recurringGroupBuilder
    .question((y) => y.question4)
    .isRequired((index) => index === 0)
  `
}
