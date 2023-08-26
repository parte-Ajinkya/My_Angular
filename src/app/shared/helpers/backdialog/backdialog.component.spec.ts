import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdialogComponent } from './backdialog.component';

describe('BackdialogComponent', () => {
  let component: BackdialogComponent;
  let fixture: ComponentFixture<BackdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
