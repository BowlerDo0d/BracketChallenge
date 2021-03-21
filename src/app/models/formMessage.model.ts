export class FormMessage {
  private _icon: string;
  private _message: string;
  private _show: boolean;
  private _type: string;

  constructor(
    icon: string = 'error',
    message: string = 'Oh snap!',
    show: boolean = false,
    type: string = 'error'
  ) {
    this._icon = icon;
    this._message = message;
    this._show = show;
    this._type = type;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(icon: string) {
    this._icon = icon;
  }

  get message(): string {
    return this._message;
  }

  set message(message: string) {
    this._message = message;
  }

  get show(): boolean {
    return this._show;
  }

  set show(show: boolean) {
    this._show = show;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }
}
