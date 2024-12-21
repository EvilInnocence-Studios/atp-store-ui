import { withRoute } from "@core/lib/withRoute";
import { ProductEditor } from "@store/components/ProductEditor";
import { ProductManager } from "../components/ProductManager";

export const storeRoutes = {
    admin: [
        {path: "/products", component: ProductManager},
        {path: "/products/:productId", component: withRoute(ProductEditor)},
    ]
}