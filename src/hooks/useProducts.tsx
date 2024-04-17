import { useEffect, useState } from "react";
import { IProduct, IProductsProvider } from "../types/Types";
import { catalog } from "../mock/Products";

export default function useProducts() {

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<IProduct[]>()

    const getProducts = async () => {
        setIsLoading(true);
        return new Promise(resolve => setTimeout(() => {
            setIsLoading(false);
            return resolve(catalog.products);
        }, 1000))
    };

    useEffect(() => {
        (async () => {
            const products = await getProducts();
            setProducts(catalog.products);
        })();
    }, [])

    return {
        getProducts,
        products,
        isLoading,
    } as IProductsProvider
}