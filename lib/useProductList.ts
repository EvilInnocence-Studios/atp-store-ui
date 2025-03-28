import { synonymReplace, useSynonyms } from "@common/lib/synonym/util";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { appendTo } from "@core/lib/util";
import { IProductFull } from "@store-shared/product/types";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { all } from "ts-functional";
import { useSharedState } from "unstateless";

type SearchableProduct = IProductFull & {search: string};

const useProductsRaw = useSharedState<SearchableProduct[]>("products", []);

export const useProductList = () => {
    const [products, setProducts] = useProductsRaw();
    const synonyms = useSynonyms();
    const loader =  useLoaderAsync();
    const navigate = useNavigate();

    const product = services().product;

    const create = (onCreate?:(productId:string) => void) => {
        loader(async () => {
            product.create({name: 'New Product', description: 'New Description', sku: 'EVI-NEW', url: 'new-product'})
                .then(newProduct => {
                    // Navigate to the new product's edit page
                    navigate(`/products/${newProduct.id}`);
                })
                .then(() => {
                    flash.success("Product created");
                    if(onCreate) {
                        onCreate(products[products.length - 1].id);
                    } else {
                        refresh();
                    }
                })
                .catch(flash.error("Failed to create product"));
        });
    }
    
    const refresh = () => {
        loader(async () => 
            product.search()
                .then(products => {
                    setProducts(products.map(p => {
                        const searchRaw = `${p.name} ${p.description} ${p.brokeredAt} ${p.tags.join(" ")}`;
                        const search = synonymReplace(searchRaw, synonyms);
                        return {...p, search};
                    }));
                })
                .catch(flash.error("Failed to load products"))
        );
    }

    useEffect(refresh, []);

    const remove = (id:string) => () => {
        const oldProducts = products;
        setProducts(products.filter(p => p.id !== id));
        loader(async () => {
            product.remove(id)
                .catch(all(() => setProducts(oldProducts), flash.error("Failed to remove product")));
        });
    }

    return {
        products,
        create,
        remove,
        refresh,
        isLoading: loader.isLoading,
    }
}