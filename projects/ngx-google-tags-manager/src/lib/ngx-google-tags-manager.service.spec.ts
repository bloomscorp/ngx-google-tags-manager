import { TestBed } from '@angular/core/testing';

import { NgxGoogleTagsManagerService } from './ngx-google-tags-manager.service';

describe('NgxGoogleTagsManagerService', () => {
  let service: NgxGoogleTagsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxGoogleTagsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
