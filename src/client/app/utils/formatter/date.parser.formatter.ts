import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';



@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    console.log(`PARSING: ${value}`)
    const date = moment(value, 'MM/DD/YYYY').add(1, 'month')
    
    if (date.isValid()) {
      const object = date.toObject()
      const parsedObject: NgbDateStruct = {
        year: object.years,
        month: object.months,
        day: object.date
      }

      console.log('PARSED:')
      console.log(parsedObject)

      return parsedObject
    } else {
      return null
    }
  }

  format(date: NgbDateStruct): string {
    console.log(`FORMATTING:`)
    console.log(date)
    const d = moment(date).subtract(1, 'month')

    if (d.isValid()) {
      const formatted = d.format('MM/DD/YYYY')
      console.log(`FORMATTED: ${formatted}`)
      return formatted
    } else {
      return null
    }
  }
}

