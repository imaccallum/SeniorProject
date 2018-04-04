import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
import { Alert, AlertType } from '../modules/alert/alert';

@Injectable()
export class AlertService {

    private subject = new Subject<Alert>();
  	public alertObservable = this.subject.asObservable()

    private keepAfterRouteChange = false;
 
    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }
 
    public success(title: string, message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, title, message, keepAfterRouteChange);
    }
 
    public error(title: string, message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, title, message, keepAfterRouteChange);
    }
 
    public info(title: string, message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, title, message, keepAfterRouteChange);
    }
 
    public warn(title: string, message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, title, message, keepAfterRouteChange);
    }
 
    alert(type: AlertType, title: string, message: string, keepAfterRouteChange = false) {
		console.log('ALERT')

		const alert: Alert = {
			type: type, 
			title: title, 
			message: message
		}
		console.log(alert)

        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(alert);
    }
 
    clear() {
        // clear alerts
        this.subject.next();
    }
}
