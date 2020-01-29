import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private requestService: RequestService) {}

  generateUrl(data: any) {
    return this.requestService.doPOST(
      `/tinyurl`, 
      data
    );
  }
}
