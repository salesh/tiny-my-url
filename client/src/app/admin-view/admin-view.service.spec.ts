/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminViewService } from './admin-view.service';

describe('Service: AdminView', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminViewService]
    });
  });

  it('should ...', inject([AdminViewService], (service: AdminViewService) => {
    expect(service).toBeTruthy();
  }));
});
