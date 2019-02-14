import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';
import { ToastMessageModel } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '+';
  messageList: ToastMessageModel[] = [];

  constructor(private router: Router,
    private bootstrapAlertService: BootstrapAlertService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.bootstrapAlertService.getAlertEvent().subscribe(r => {
      this.messageList.push(r);
      setTimeout(() => {
        this.messageList = [];
      }, 2000);
    });
  }
}
