import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponentProjectComponent } from './proponent-project.component';

describe('ProponentProjectComponent', () => {
  let component: ProponentProjectComponent;
  let fixture: ComponentFixture<ProponentProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProponentProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProponentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
