export class FormError {
  icon: string;
  message: string;
  show: boolean;
  type: string;

  constructor() {
    this.icon = 'fa-exclamation-triangle';
    this.message = 'Oh snap!';
    this.show = false;
    this.type = 'alert-danger';
  }

  set(props) {
    Object.assign(this, props);
  }
}
