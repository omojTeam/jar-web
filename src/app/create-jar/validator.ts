
import { AbstractControl, ValidationErrors } from "@angular/forms";

export function cardsToCardsLimit(
    control: AbstractControl
  ): ValidationErrors | null {
    if(control && control.get("cards") && control.get("cardsPerDay")) {
      const cards = control.get("cards").value.length;
      const cardsLimit = control.get("cardsPerDay").value;
      if(cardsLimit > cards) {
        const testControl = control.get('cardsPerDay');
        if(testControl) testControl.setErrors({'limitError': true});
        return {limitError: true};
      } else {
        return null;
      }
    }
    return null;
  }