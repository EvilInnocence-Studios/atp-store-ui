import { synonymReplace, useSynonyms } from "@common/lib/synonym/util";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IProduct, IProductFull } from "@store-shared/product/types";
import { useEffect } from "react";
import { all } from "ts-functional";
import { useSharedState } from "unstateless";

type SearchableProduct = IProductFull & {search: string};

const useProductsRaw = useSharedState<SearchableProduct[]>("products", []);

export const useProductList = () => {
    const [products, setProducts] = useProductsRaw();
    const synonyms = useSynonyms();
    const loader =  useLoaderAsync();

    const product = services().product;

    const create = (onCreate?:(product:IProduct) => void) => {
        loader(async () => {
            product.create({name: 'New Product', description: 'New Description', sku: 'EVI-S', url: 'new-product'})
                .then(newProduct => {
                    if(onCreate && typeof onCreate === "function") {
                        onCreate(newProduct);
                    } else {
                        refresh();
                    }
                })
                .then(flash.success("Product created"))
                .catch(flash.error("Failed to create product"));
        });
    }

    const updateSearch = () => {
        setProducts(old => old.map(p => {
            const searchRaw = `${p.name} ${p.description} ${p.brokeredAt} ${p.tags.join(" ")}`;
            const search = synonymReplace(searchRaw, synonyms);
            return {...p, search};
        }));
    }

    const refresh = () => {
        loader(async () => 
            product.search()
                .then(products => {
                    setProducts(products.map(p => ({...p, search: ""})));
                    updateSearch();
                })
                .catch(flash.error("Failed to load products"))
        );
    }

    useEffect(refresh, []);
    useEffect(updateSearch, [synonyms]);

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