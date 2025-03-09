import { Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { findAll, load } from "../products.action";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class ProductsEffects {

    loadProducts$ = createEffect(
        //pipe nos permite manipular el flujo siempre de forma reactiva
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(() => this.service.findAll())//exhaustMap hace una llamda al backend
        ).pipe(
            map(products => (findAll({ products }))),
            catchError(() => EMPTY)
        )
    );
    constructor(
        private actions$: Actions, //El $ se usa para decir que es un parametro reactivo (componente observable)
        private service: ProductService) {

    }

}