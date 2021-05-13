import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsNotifyComponent } from './options-notify.component';

describe('OptionsNotifyComponent', () => {
  let component: OptionsNotifyComponent;
  let fixture: ComponentFixture<OptionsNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
