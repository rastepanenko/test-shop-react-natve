import { useEffect, useState } from "react";
import { IProduct, IProductsProvider } from "../types/Types";
import { catalog } from "../mock/Products";

export default function useProducts() {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState<IProduct[]>()
    
    const getProducts = async () => {
        setIsLoading(true);
        try {
            return new Promise(resolve => setTimeout(() => {
            
            setProducts(catalog.products)
            setIsLoading(false);
            return resolve(catalog.products);
            }, 1000))
        } catch (error) {
            console.error(error);
            setErrorMessage('Error loading catalog. Try again later')
        }
    };

    useEffect(() => {
        (async () => {
            await getProducts();
        })();
    }, [])

    return {
        getProducts,
        products,
        errorMessage,
        isLoading,
    } as IProductsProvider
}