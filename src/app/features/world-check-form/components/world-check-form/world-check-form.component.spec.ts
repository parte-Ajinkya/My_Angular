import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldCheckFormComponent } from './world-check-form.component';

describe('WorldCheckFormComponent', () => {
  let component: WorldCheckFormComponent;
  let fixture: ComponentFixture<WorldCheckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldCheckFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldCheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
