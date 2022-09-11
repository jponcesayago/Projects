import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepuestaComponent } from './detalle-repuesta.component';

describe('DetalleRepuestaComponent', () => {
  let component: DetalleRepuestaComponent;
  let fixture: ComponentFixture<DetalleRepuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleRepuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRepuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
