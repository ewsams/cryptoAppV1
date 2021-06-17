import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPromiseGraphicComponent } from './upload-promise-graphic.component';

describe('UploadPromiseGraphicComponent', () => {
  let component: UploadPromiseGraphicComponent;
  let fixture: ComponentFixture<UploadPromiseGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPromiseGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPromiseGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
