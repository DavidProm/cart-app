import { createReducer, on } from "@ngrx/store"
import { findAll, load } from "./products.action"

const products: any = [];

const inititalState = {
    products
}

export const productsReducer = createReducer(
    inititalState,
    on(load, (state) => ({ products: [...state.products] })),
    on(findAll, (state, { products }) => ({ products: [...products] })),

)