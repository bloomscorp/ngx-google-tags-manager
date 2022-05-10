import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGoogleTagsManagerComponent } from './ngx-google-tags-manager.component';

describe('NgxGoogleTagsManagerComponent', () => {
  let component: NgxGoogleTagsManagerComponent;
  let fixture: ComponentFixture<NgxGoogleTagsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxGoogleTagsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGoogleTagsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
