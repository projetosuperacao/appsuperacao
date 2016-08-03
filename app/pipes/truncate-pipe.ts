import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string) : string {
    let limit = parseInt(args);
    if(!args) {
      return value.substring(0, 30) + "...";
    }
    if(value.length > limit) {
      return value.substring(0, limit) + "...";
    } else {
      return value;
    }

 }
}
