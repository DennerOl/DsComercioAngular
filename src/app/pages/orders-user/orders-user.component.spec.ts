import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersUserComponent } from './orders-user.component';

describe('OrdersUserComponent', () => {
  let component: OrdersUserComponent;
  let fixture: ComponentFixture<OrdersUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersUserComponent]
    });
    fixture = TestBed.createComponent(OrdersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
