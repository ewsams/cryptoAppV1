import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoterryComponent } from './loterry.component';

describe('LoterryComponent', () => {
  let component: LoterryComponent;
  let fixture: ComponentFixture<LoterryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoterryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoterryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
