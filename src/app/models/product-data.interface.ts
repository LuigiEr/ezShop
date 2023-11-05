import { FormControl } from "@angular/forms";

export interface IProductDataForm {
  title: FormControl<string>;
  category: FormControl<string>;
  price: FormControl<number>;
  employee: FormControl<string | null>;
  description?: FormControl<string | null>;
  reviews?: FormControl<string[] | null>;
}
