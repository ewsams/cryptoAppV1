import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WingsIconComponent } from './wings-icon.component';

describe('WingsIconComponent', () => {
  let component: WingsIconComponent;
  let fixture: ComponentFixture<WingsIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WingsIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WingsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
