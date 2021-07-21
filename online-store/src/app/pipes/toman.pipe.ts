import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toman'
})
export class TomanPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' تومان';
  }

}
