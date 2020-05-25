import { createFormBuilder } from './index'

function getBuilder() {
  const myForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: 22.5
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

  builder.group((x) => x.group1).isActive(() => false)

  builder.question((x) => x.group1.question3).isActive(() => true)

  return builder
}

export function test() {
  const builder = getBuilder()

  const status1 = builder.getStatus((x) => x.question1)
  const status2 = builder.getStatus((x) => x.question2)
  const statusGroup1 = builder.getStatus((x) => x.group1)
  const statusQuestion3 = builder.getStatus((x) => x.group1.question3)

  return (
    status1.active &&
    status2.active &&
    status1.required &&
    !status2.required &&
    !statusGroup1.active &&
    !statusQuestion3.active
  )
}
