import { FormBuilder } from './index'

interface IMyForm {
  question1: number
  question2: string
}

export function Test() {
  const myForm = {
    question1: 5,
    question2: 'answer'
  }

  const builder = new FormBuilder<IMyForm>(myForm)

  builder.NumberQuestion((x) => x.question1).IsRequired()
  builder
    .StringQuestion((x) => x.question2)
    .IsActive((x) => x.question1 > 3)
    .IsRequired()
}
