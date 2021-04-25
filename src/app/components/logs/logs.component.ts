import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  isLoaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(logs => this.logs=logs);
    this.isLoaded = true;

    this.logService.state.subscribe(() => {
      this.selectedLog = {id:'', body: '', date: ''}
    });
  }

  onEditLog(log: Log){
    this.logService.setFormLog(log);
    this.selectedLog=log;
  }

  onDeleteLog(log: Log){
    if(confirm('are you sure?')){
      this.logService.deleteLog(log);
    }
  }

}
