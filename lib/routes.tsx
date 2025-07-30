import { withRoute } from "@core/lib/withRoute";
import { Cart } from "@store/components/Cart";
import { DiscountEditor } from "@store/components/DiscountEditor";
import { ProductEditor } from "@store/components/ProductEditor";
import { ProductPage } from "@store/components/ProductPage";
import { ProductQueue } from "@store/components/ProductQueue";
import { ProductsPage } from "@store/components/ProductsPage";
import { ProductManager } from "../components/ProductManager";

export const storeRoutes = {
    admin: [
        {path: "/products",              component: ProductManager          },
        {path: "/products/:productId",   component: withRoute(ProductEditor)},
        {path: "/discounts",             component: DiscountEditor          },
        {path: "/queue/:groupId/:tagId", component: withRoute(ProductQueue) },
    ],
    public: [
        {path: "/cart",                component: Cart                    },
        {path: "/products",            component: ProductsPage            },
        {path: "/products/:url",       component: withRoute(ProductPage)  },
    ]
}