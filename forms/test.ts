import { FormBuilder } from './index'

interface IMyForm {
  question1: number
  question2: string
  group1: IGroup1
}

interface IGroup1 {
  question3: number
}

function getBuilder() {
  const myForm = {
    question1: 5,
    question2: 'answer',
    group1: {
      question3: 22.5
    }
  }

  const builder = new FormBuilder<IMyForm>(myForm)

  builder.question((x) => x.question1).IsRequired()

  builder
    .question((x) => x.question2)
    .IsActive((x) => x.question1 > 3)
    .IsRequired(() => false)

  builder.group((x) => x.group1).IsActive(() => false)

  builder.question((x) => x.group1.question3).IsActive(() => true)

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
