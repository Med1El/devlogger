import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LogFormComponent } from '../components/log-form/log-form.component';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];
  idGen: number = 0;

  private logSource = new BehaviorSubject<Log>({id: null, body: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  state = this.stateSource.asObservable();

  constructor() { }

  getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') == null){
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs);
  }

  addLog(log: Log){
    log.id = this.generateId();
    this.logs.push(log);
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // getLog(id: number):Log{
  //   this.logs.forEach((cur, index)=>{
  //     if(cur.id==id){
  //       return cur;
  //     }
  //   })
  //   return null;
  // }

  setFormLog(log: Log){
    this.logSource.next(log);
  }

  updateLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(cur.id==log.id){
        this.logs.splice(index, 1);
        this.logs.unshift(log);
      }
    });
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index, 1);
      }
    })
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }  
  
}
