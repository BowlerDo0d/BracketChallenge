export class FormError {
  private _icon: string;
  private _message: string;
  private _show: boolean;
  private _type: string;

  constructor(icon: string = 'fa-exclamation-triangle',
    message: string = 'Oh snap!',
    show: boolean = false,
    type: string = 'alert-danger') {
    this._icon = icon;
    this._message = message;
    this._show = show;
    this._type = type;
  }

  get icon(): string {
    return this._icon;
  }

  get message(): string {
    return this._message;
  }

  get show(): boolean {
    return this._show;
  }

  get type(): string {
    return this._type;
  }

  set icon(icon: string) {
    this._icon = icon;
  }

  set message(message: string) {
    this._message = message;
  }

  set show(show: boolean) {
    this._show = show;
  }

  set type(type: string) {
    this._type = type;
  }
}
