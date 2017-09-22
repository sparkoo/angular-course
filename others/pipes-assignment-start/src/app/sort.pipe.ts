import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any, key: string): any {
    return value.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
  }
}
