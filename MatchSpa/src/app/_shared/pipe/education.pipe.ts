import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'education'
})
export class EducationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let retValue: string;
    switch (value) {
      case 0:
        retValue = '未設定';
        break;
      case 1:
        retValue = '小學';
        break;
      case 2:
        retValue = '中學';
        break;
      case 3:
        retValue = '高中(職)';
        break;
      case 4:
        retValue = '大學(專)';
        break;
      case 5:
        retValue = '碩士';
        break;
      case 6:
        retValue = '博士';
        break;
    }
    return retValue;
  }


}
