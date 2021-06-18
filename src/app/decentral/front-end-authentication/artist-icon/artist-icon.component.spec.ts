import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistIconComponent } from './artist-icon.component';

describe('ArtistIconComponent', () => {
  let component: ArtistIconComponent;
  let fixture: ComponentFixture<ArtistIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
