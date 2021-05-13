import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NftNotificationComponent } from './nft-notification.component';

describe('NftNotificationComponent', () => {
  let component: NftNotificationComponent;
  let fixture: ComponentFixture<NftNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NftNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NftNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
