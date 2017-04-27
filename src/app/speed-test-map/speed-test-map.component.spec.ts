import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedTestMapComponent } from './speed-test-map.component';

describe('SpeedTestMapComponent', () => {
  let component: SpeedTestMapComponent;
  let fixture: ComponentFixture<SpeedTestMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedTestMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedTestMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
