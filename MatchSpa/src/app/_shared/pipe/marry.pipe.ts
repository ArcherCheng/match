import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marry'
})
export class MarryPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let retValue: string;
    switch (value) {
      case 1:
        retValue = '單身未婚';
        break;
      case 2:
        retValue = '二春無小孩';
        break;
      case 3:
        retValue = '二春有小孩';
        break;
    }

    return retValue;
  }
}
