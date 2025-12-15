import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipse',
})
export class EllipsePipe implements PipeTransform {

  transform(value: string, maxLength: number): unknown {
    return value.slice(0, maxLength) + (value.length > maxLength ? "..." : "");
  }

}
