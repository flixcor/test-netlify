interface IQuestionBuilder {}

class QuestionBuilder<TForm, TQuestionType> implements IQuestionBuilder {
  path: (x: TForm) => TQuestionType
  isRequired: (form: TForm) => boolean = () => false
  isActive: (form: TForm) => boolean = () => true

  constructor(path: (x: TForm) => TQuestionType) {
    this.path = path
  }

  public IsRequired(func: (form: TForm) => boolean = () => true) {
    this.isRequired = func
    return this
  }

  public IsActive(func: (form: TForm) => boolean) {
    this.isActive = func
    return this
  }
}

class StringQuestionBuilder<T> extends QuestionBuilder<T, string> {}
class NumberQuestionBuilder<T> extends QuestionBuilder<T, number> {}

export class Form<T> {
  private form: T

  private questionBuilders: Record<string, IQuestionBuilder> = {}

  constructor(form: T) {
    this.form = form
  }

  public StringQuestion(path: (x: T) => string) {
    const str = path.toString()
    const pathStr = str.substring(str.indexOf('.') + 1)

    let builder = <StringQuestionBuilder<T>>this.questionBuilders[pathStr]

    if (!builder) {
      builder = new StringQuestionBuilder<T>(path)
      this.questionBuilders[pathStr] = builder
    }

    return builder
  }

  public NumberQuestion(path: (x: T) => number) {
    const str = path.toString()
    const pathStr = str.substring(str.indexOf('.') + 1)

    let builder = <NumberQuestionBuilder<T>>this.questionBuilders[pathStr]

    if (!builder) {
      builder = new NumberQuestionBuilder<T>(path)
      this.questionBuilders[pathStr] = builder
    }

    return builder
  }
}
