import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup , FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder
  ) {
    this.buildForm();
   }

  form : FormGroup;

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]],
        lastName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]],
      }),
      //name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      color: ['#000000'],
      date: ['',[, Validators.required]],
      age: [18,[Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tag: [''],
      agree: [false,[Validators.requiredTrue]],
      gender: [''],
      zone: [''],
    });
  }

  selectOptions: any [] = [
    {Value:'Categoría 1', Text:'Categoría 1'},
    {Value:'Categoría 2', Text:'Categoría 2'},
    {Value:'Categoría 3', Text:'Categoría 3'},
  ]

  ngOnInit(): void {

    
    
    this.nameField.valueChanges
    .subscribe( value =>{
      //console.log(value);
    });
  }

  getValue()
  {
    console.log(this.nameField.value)
  }

  get nameField()
  {
    return this.form.get('fullName.name');
  }
  get lastNameField()
  {
    return this.form.get('fullName.lastName');
  }
  get isNameFieldValid()
  {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid()
  {
    return this.nameField.touched && this.nameField.invalid;
  }

  

  get isLastNameFieldValid()
  {
    return this.lastNameField.touched && this.lastNameField.valid;
  }

  get isLastNameFieldInvalid()
  {
    return this.lastNameField.touched && this.lastNameField.invalid;
  }

  get isEmailFieldValid()
  {
    return this.emailField.touched && this.emailField.valid;
  }

  get isEmailFieldInvalid()
  {
    return this.emailField.touched && this.emailField.invalid;
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get ageField() {
    return this.form.get('age');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }


  save(e)
  {
    if (this.form.valid){
      console.log(e);
      console.log(this.form.value);
    }else{
      this.form.markAllAsTouched();
    }
   
  }
}
