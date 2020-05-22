type QuestionType = string | number
type GroupType = object
type FormElementType = QuestionType | GroupType

interface IQuestionBuilder<TForm extends object> {
  isRequired: (form: TForm) => boolean
  isActive: (form: TForm) => boolean
}

class FormElementBuilder<TForm extends object, TElement extends FormElementType>
  implements IQuestionBuilder<TForm> {
  path: (x: TForm) => TElement
  isRequired: (form: TForm) => boolean = () => false
  isActive: (form: TForm) => boolean = () => true

  constructor(path: (x: TForm) => TElement) {
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
    return this.getElementBuilder(path)
  }

  public group<Gt extends GroupType>(path: (x: T) => Gt) {
    return this.getElementBuilder(path)
  }

  public getStatus<Qt extends FormElementType>(path: (x: T) => Qt) {
    const builder = this.getElementBuilder(path)
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

  private getPathString<Et extends FormElementType>(path: (x: T) => Et) {
    const str = path.toString()
    const skipFirstPart = str.substring(str.indexOf('.') + 1)
    const skipLastPart = skipFirstPart.substring(0, skipFirstPart.indexOf(';'))
    return skipLastPart
  }

  private getElementBuilder<Et extends FormElementType>(path: (x: T) => Et) {
    const pathStr = this.getPathString(path)

    let builder = <FormElementBuilder<T, Et>>this.questionBuilders[pathStr]

    if (!builder) {
      builder = new FormElementBuilder<T, Et>(path)
      this.questionBuilders[pathStr] = builder
    }

    return builder
  }
}
