import { createAction, props } from "@ngrx/store";

export const load = createAction('load', props<{products: any}>());