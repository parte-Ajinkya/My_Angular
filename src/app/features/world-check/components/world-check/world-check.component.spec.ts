import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldCheckComponent } from './world-check.component';

describe('WorldCheckComponent', () => {
  let component: WorldCheckComponent;
  let fixture: ComponentFixture<WorldCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
