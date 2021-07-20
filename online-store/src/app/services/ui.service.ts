import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private profileTabStatus: string;
  private profileSubject = new Subject<any>();

  private loginStatus: boolean;
  private loginSubject = new Subject<any>();

  constructor() {}

  changeTabStatus(status): void {
    this.profileTabStatus = status;
    this.profileSubject.next(this.profileTabStatus);
  }

  onTabChange(): Observable<any> {
    return this.profileSubject.asObservable();
  }


}
