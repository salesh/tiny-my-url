import { Component, OnInit } from '@angular/core';
import { AdminViewService } from './admin-view.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  view: any[] = [700, 400];
  single: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Numbers';
  showYAxisLabel = true;
  yAxisLabel = 'Domains';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private adminViewService: AdminViewService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.adminViewService.getDailyStatistic().subscribe((res: any) => {
      this.single = res;
    }, error => {
      this.toastr.error('Error ', error);
    });
  }

}
