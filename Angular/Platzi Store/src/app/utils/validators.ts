import { AbstractControl } from '@angular/forms';
import { CategoriesService } from "../services/categories.service";
import { map } from "rxjs/operators";
export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static isPasswordValid(control:AbstractControl){
    const value = control.value;

    if (!containsNumber(value)) {
      return {
        invalid_password: true
      }
    }

    return null;
  }

  static matchPasswords(control:AbstractControl){
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password!==confirmPassword) {
      return {
        match_password: true
      }
    }

    return null;
  }


  static isCategoryValid(service: CategoriesService){

    return  (control : AbstractControl) =>{
      const value = control.value;
      return  service.checkCategory(value)
      .pipe(
        map((reponse: any) => {
          const isAvailable = reponse.isAvailable;
          if (!isAvailable){
            return {not_available: true}
          }
          return null;
        })
      );
    }
  }

}


function isNumber(value: string)
{
  return !isNaN(parseInt(value,10));
}

function containsNumber(value: string){
  return value.split('').find(value => isNumber(value))!==undefined;
}
