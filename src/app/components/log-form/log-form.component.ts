import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/Log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  log: Log = {
    id: '',
    body: '',
    date: ''
  };

  isNew: boolean = true;


  constructor(private LogService: LogService) { }

  ngOnInit(): void {
    this.LogService.selectedLog.subscribe(log => {
      if(log.id!=null){
        this.isNew=false;
        this.log=log;
      }
    });
  }

  onAddLog(){
    this.log.date = new Date();
    this.LogService.addLog(this.log);
    this.log = {
      id: '',
      body: '',
      date: ''
    };
  }

  onClear(){
    this.log = {
      id: '',
      body: '',
      date: ''
    }
    this.isNew=true;
    this.LogService.clearState();
  }



  onUpdateLog(){
    this.LogService.updateLog(this.log);
    this.log = {
      id: '',
      body: '',
      date: ''
    };
    this.isNew=true;
    this.LogService.clearState();
  }

}
