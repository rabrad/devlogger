import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Log } from '../models/log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logs: Log[];

  /* BehaviorSubject  allow log component to listen 
   to the changes and events in logs component 
    It takes ""source" & "observable" variables
   */

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null,
  });
  selectedLog = this.logSource.asObservable();

  //
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated components',
    //     date: new Date('12/26/2020 12:00:00'),
    //   },
    //   {
    //     id: '2',
    //     text: 'Added bootstrap',
    //     date: new Date('11/27/2020 09:00:00'),
    //   }

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    // Check to get stored data in local storage
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(
      this.logs.sort((a, b) => {
        return b.date - a.date;
      })
    );
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    // local storage store strings only
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    // Update local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    // Delete local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
