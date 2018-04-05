import { FormControl, Validators } from '@angular/forms';

export class BracketNameValidator extends Validators {
  static checkBracketName(control: FormControl) {
    // Wire up to firebase
    if (control.value && control.value === 'taken') {
      return { bracket_name_exists: true };
    }

    return null;
  }
}
