import { Component, OnInit, Input } from '@angular/core';
import { BootstrapAlertService } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  @Input() title: string;
  @Input() submit: string;
  @Input() categoryPage:boolean;
  constructor(private bootstrapAlertService: BootstrapAlertService) { }

  ngOnInit() {
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  save() {
    this.bootstrapAlertService.showError('Error Occured');
    }
}
