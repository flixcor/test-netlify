import { createFormBuilder } from 'fluent-forms'

export interface IMyForm {
  question1: number
  question2: string
  group1: IGroup1
}

interface IGroup1 {
  question3: number[]
}

export function getBuilder() {
  const myForm: IMyForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: [22.5]
    }
  }

  const builder = createFormBuilder<IMyForm>(myForm)

  builder.question((x) => x.question1).isRequired()

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
    }
  }

  const builder = createFormBuilder(myForm)

  builder.question((x) => x.question1).isRequired()

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
  `
}
