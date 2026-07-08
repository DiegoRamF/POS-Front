import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const AUTH_REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_PERU: /^\d{9}$/,
  VALID_NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ][a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{1,}$/,
  PASSWORD_STRONG: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
};

export class AuthValidators {

  static emailFormat(): ValidatorFn {
    return( control: AbstractControl ): ValidationErrors | null => {
      if( !control.value ) return null;
      const isValid = AUTH_REGEX.EMAIL.test( control.value );
      return isValid ? null : { isValidEmail: true };
    };
  };

  static phoneFormat(): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      if( !control.value ) return null;
      const isValid = AUTH_REGEX.PHONE_PERU.test( control.value );
      return isValid ? null : { invalidPhone: true };
    };
  };

  static nameFormat(): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      if( !control.value ) return null;
      const value = control.value.trim();
      const isValid = AUTH_REGEX.VALID_NAME.test( value );
      return isValid ? null : { invalidName: true };
    };
  };

  static strongPassword(): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      if( !control.value ) return null;
      const isValid = AUTH_REGEX.PASSWORD_STRONG.test( control.value );
      return isValid ? null : { weakPassword: true}
    };
  };

  static passwordsMatch: ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {
    const password = control.get( 'password' )?.value;
    const confirmPassword = control.get( 'confirmPassword' )?.value;
    if( !password || !confirmPassword ) return null;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

};
