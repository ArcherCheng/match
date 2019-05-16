import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marry'
})
export class MarryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
