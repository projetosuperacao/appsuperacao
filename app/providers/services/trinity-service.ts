import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TrinityService {
  private data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  getTrinity() {
    /*if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:3000/schedule')
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
        });
    });*/
  }
}
