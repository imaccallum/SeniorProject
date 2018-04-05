import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';



export class PasswordValidator {

  static matchPassword(control: AbstractControl): {[key: string]: any} {
    const passwordField = control.parent.get('password')
    const password = passwordField.value; // to get value in input tag
    const confirmPassword = control.value; // to get value in input tag
    
    if (password !== confirmPassword) {
      return { matchPassword: true }
    } else {
      return null
    }
  }
}
