import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let retValue: string;
    switch (value) {
      case 1:
        retValue = '男';
        break;
      case 2:
        retValue = '女';
        break;
    }
    return retValue;
  }

}
