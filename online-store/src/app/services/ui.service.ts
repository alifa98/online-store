import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private profileTabStatus: string;
  private profileSubject = new Subject<any>();

  constructor() {}

  changeProfileTabStatus(status): void {
    this.profileTabStatus = status;
    this.profileSubject.next(this.profileTabStatus);
  }

  onProfileTabChange(): Observable<any> {
    return this.profileSubject.asObservable();
  }
}
