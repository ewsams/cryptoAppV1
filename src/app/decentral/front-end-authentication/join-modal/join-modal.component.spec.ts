import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JoinModalComponent } from './join-modal.component';

describe('JoinModalComponent', () => {
  let component: JoinModalComponent;
  let fixture: ComponentFixture<JoinModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
