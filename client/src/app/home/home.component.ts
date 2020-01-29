import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from './home.service';
import { ToastrService } from 'ngx-toastr';
import { URL_PATTERN } from 'src/helpers/patterns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formGroup: FormGroup;
  generatedUrlString: string = '';

  constructor(
    private homeService: HomeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.generatedUrlString = '';
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = new FormGroup({
      url: new FormControl('', { validators: [Validators.required, Validators.pattern(URL_PATTERN)]})        
    });
  }

  generateUrl(): void {
    if (this.formGroup.valid) {
      this.generatedUrlString = '';
      const objectData = {
        url: this.formGroup.get('url').value
      };
      this.homeService.generateUrl(objectData).subscribe((res: any) => {
        this.generatedUrlString = res.tinyUrl;
      }, error => {
        this.toastr.error('Error ', error);
      });
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  goToLink(): void {
    window.open(this.generatedUrlString, "_blank");
  }
}
