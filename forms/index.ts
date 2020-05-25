type FormQuestion = string | number | string[] | number[]
type FormGroup = object | object[]
type FormElement = FormQuestion | FormGroup

interface IFormElementBuilderInternal<TForm extends object> {
  _isRequired: (form: IFormEvaluator<TForm>) => boolean
  _isActive: (form: IFormEvaluator<TForm>) => boolean
}

interface IFormElementBuilder<TForm extends object> {
  isRequired(
    func: (form: IFormEvaluator<TForm>) => boolean
  ): IFormElementBuilderInternal<TForm>
  isActive(
    func: (form: IFormEvaluator<TForm>) => boolean
  ): IFormElementBuilderInternal<TForm>
}

class FormElementBuilder<TForm extends object, TElement extends FormElement>
  implements IFormElementBuilderInternal<TForm>, IFormElementBuilder<TForm> {
  path: (x: TForm) => TElement
  _isRequired: (form: IFormEvaluator<TForm>) => boolean = () => false
  _isActive: (form: IFormEvaluator<TForm>) => boolean = () => true

  constructor(path: (x: TForm) => TElement) {
    this.path = path
  }

  public isRequired(
    func: (form: IFormEvaluator<TForm>) => boolean = () => true
  ) {
    this._isRequired = func
    return this
  }

  public isActive(func: (form: IFormEvaluator<TForm>) => boolean) {
    this._isActive = func
    return this
  }
}

interface IFormBuilder<T extends object> {
  getStatus<Qt extends FormElement>(path: (x: T) => Qt): IFormElementStatus

  question<Qt extends FormQuestion>(
    path: (x: T) => Qt
  ): FormElementBuilder<T, Qt>

  group<Gt extends FormGroup>(path: (x: T) => Gt): FormElementBuilder<T, Gt>
}

interface IFormEvaluator<T extends object> {
  evaluate<TE extends FormElement>(
    path: (x: T) => TE,
    evaluation: (x: TE) => boolean
  ): boolean
}

interface IFormElementStatus {
  active: boolean
  required: boolean
}

class FormBuilder<T extends object>
  implements IFormEvaluator<T>, IFormBuilder<T> {
  private form: T

  private questionBuilders: Record<string, IFormElementBuilderInternal<T>> = {}

  constructor(form: T) {
    this.form = form
  }

  evaluate<TE extends FormElement>(
    path: (x: T) => TE,
    evaluation: (x: TE) => boolean
  ): boolean {
    const pathString = this.getPathString(path)
    return this.isActiveRecursive(pathString) && evaluation(path(this.form))
  }

  public question<Qt extends FormQuestion>(path: (x: T) => Qt) {
    return this.getElementBuilder(path)
  }

  public group<Gt extends FormGroup>(path: (x: T) => Gt) {
    return this.getElementBuilder(path)
  }

  public getStatus<Qt extends FormElement>(path: (x: T) => Qt) {
    const builder = this.getElementBuilder(path)
    const pathStr = this.getPathString(path)

    return {
      required: builder._isRequired(this),
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

    if (builder && !builder._isActive(this)) {
      return false
    }

    return this.isActiveRecursive(path, level + 1)
  }

  private getPathString<Et extends FormElement>(path: (x: T) => Et) {
    const str = path.toString()
    const skipFirstPart = str.substring(str.indexOf('.') + 1)
    const skipLastPart = skipFirstPart.substring(0, skipFirstPart.indexOf(';'))
    return skipLastPart
  }

  private getElementBuilder<Et extends FormElement>(path: (x: T) => Et) {
    const pathStr = this.getPathString(path)

    let builder = <FormElementBuilder<T, Et>>this.questionBuilders[pathStr]

    if (!builder) {
      builder = new FormElementBuilder<T, Et>(path)
      this.questionBuilders[pathStr] = builder
    }

    return builder
  }
}

export function createFormBuilder<T extends object>(form: T) {
  return <IFormBuilder<T>>new FormBuilder(form)
}
