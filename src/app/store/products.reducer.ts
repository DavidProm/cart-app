import { createReducer, on } from "@ngrx/store"
import { load } from "./products.action"

const products: any = [];

const inititalState = {
    products
}

export const productsReducer = createReducer(
    inititalState,
    on(load, (state, { products }) => ({ products: [...products] })),
    
)