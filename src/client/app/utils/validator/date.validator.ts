import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';


export class DateValidator {

  static ageRange(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      console.log('AGE RANGE')
      console.log(control.value)
      const date = moment(control.value).subtract(1, 'month')
      const now = moment()
      console.log(date)
      console.log(now)


      if (!date.isValid()) {
        return { ageRange: 'Invalid date' }
      }

      const yearsOld = now.diff(date, 'years', true) // 86400000

      console.log('DIFF')
      console.log(yearsOld)

      if (yearsOld < minAge) {
        return { ageRange: `Must be ${minAge} or older`}
      } else if (yearsOld > maxAge) {
        return { ageRange: `Invalid age: ${yearsOld}`}
      } else {
        return null
      }
    }
  }

}





