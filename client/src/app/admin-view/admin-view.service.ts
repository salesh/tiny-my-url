import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class AdminViewService {

  constructor(private requestService: RequestService) {}

  getDailyStatistic() {
    return this.requestService.doGET(
        `/api/tinyurl/daily-statistic`
    );
  }
}
