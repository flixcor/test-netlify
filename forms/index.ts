type QuestionType = string | number
type GroupType = object

interface IQuestionBuilder<TForm extends object> {
  isRequired: (form: TForm) => boolean
  isActive: (form: TForm) => boolean
}

class QuestionBuilder<
  TForm extends object,
  TQuestionType extends QuestionType | GroupType
> implements IQuestionBuilder<TForm> {
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

export class FormBuilder<T extends object> {
  private form: T

  private questionBuilders: Record<string, IQuestionBuilder<T>> = {}

  constructor(form: T) {
    this.form = form
  }

  public question<Qt extends QuestionType>(path: (x: T) => Qt) {
    return this.getQuestionBuilder(path)
  }

  public group<Gt extends GroupType>(path: (x: T) => Gt) {
    return this.getQuestionBuilder(path)
  }

  public getStatus<Qt extends QuestionType | GroupType>(path: (x: T) => Qt) {
    const builder = this.getQuestionBuilder(path)
    const pathStr = this.getPathString(path)

    return {
      required: builder.isRequired(this.form),
      active: this.isActiveRecursive(pathStr)
    }
  }

  private isActiveRecursive(path: string, level: number = 1): boolean {
    const split = path.split('.')

    if (level > split.length) {
      return true
    }

    const currentPath = split.slice(0, level).join('.')

    const builder = this.questionBuilders[currentPath]

    if (builder && !builder.isActive(this.form)) {
      return false
    }

    return this.isActiveRecursive(path, level + 1)
  }

  private getPathString<Qt extends QuestionType | GroupType>(
    path: (x: T) => Qt
  ) {
    const str = path.toString()
    const skipFirstPart = str.substring(str.indexOf('.') + 1)
    const skipLastPart = skipFirstPart.substring(0, skipFirstPart.indexOf(';'))
    return skipLastPart
  }

  private getQuestionBuilder<Qt extends QuestionType | GroupType>(
    path: (x: T) => Qt
  ) {
    const pathStr = this.getPathString(path)

    let builder = <QuestionBuilder<T, Qt>>this.questionBuilders[pathStr]

    if (!builder) {
      builder = new QuestionBuilder<T, Qt>(path)
      this.questionBuilders[pathStr] = builder
    }

    return builder
  }
}
