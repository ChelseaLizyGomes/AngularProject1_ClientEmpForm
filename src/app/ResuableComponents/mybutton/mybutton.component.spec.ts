import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybuttonComponent } from './mybutton.component';

describe('MybuttonComponent', () => {
  let component: MybuttonComponent;
  let fixture: ComponentFixture<MybuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MybuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
