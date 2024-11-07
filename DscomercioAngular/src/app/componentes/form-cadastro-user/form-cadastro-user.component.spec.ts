import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroUserComponent } from './form-cadastro-user.component';

describe('FormCadastroUserComponent', () => {
  let component: FormCadastroUserComponent;
  let fixture: ComponentFixture<FormCadastroUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCadastroUserComponent]
    });
    fixture = TestBed.createComponent(FormCadastroUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
