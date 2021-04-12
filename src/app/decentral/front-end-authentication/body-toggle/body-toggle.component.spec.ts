import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyToggleComponent } from './body-toggle.component';

describe('BodyToggleComponent', () => {
  let component: BodyToggleComponent;
  let fixture: ComponentFixture<BodyToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
