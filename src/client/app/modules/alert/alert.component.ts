import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';
 

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    alerts: Alert[] = [];
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
		console.log('SUBSCRIBING TO ALERTS')
		console.log(this.alertService)
        this.alertService.alertObservable.subscribe(alert => {
			console.log('NEW ALERT')
			console.log(alert)
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }
 
            // add alert to array
            this.alerts.push(alert);
        }, err => {
		console.log(err)
	});
    }
 
    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
 
    classForAlert(alert: Alert) {
        if (!alert) {
            return;
        }
 
        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert-success';
            case AlertType.Error:
                return 'alert-danger';
            case AlertType.Info:
                return 'alert-info';
            case AlertType.Warning:
                return 'alert-warning';
        }
    }
}
