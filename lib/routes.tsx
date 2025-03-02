import { withRoute } from "@core/lib/withRoute";
import { BackstagePass } from "@store/components/BackstagePass";
import { Cart } from "@store/components/Cart";
import { DiscountEditor } from "@store/components/DiscountEditor";
import { MyAccount } from "@store/components/MyAccount";
import { ProductEditor } from "@store/components/ProductEditor";
import { ProductPage } from "@store/components/ProductPage";
import { ProductsPage } from "@store/components/ProductsPage";
import { Queue } from "@store/components/Queue";
import { ProductManager } from "../components/ProductManager";

export const storeRoutes = {
    admin: [
        {path: "/products",            component: ProductManager          },
        {path: "/products/:productId", component: withRoute(ProductEditor)},
        {path: "/discounts",           component: DiscountEditor          },
        {path: "/queue/:tagName",      component: withRoute(Queue)        },
    ],
    public: [
        {path: "/my-account/:tab",     component: withRoute(MyAccount)    },
        {path: "/my-account/:tab/:id", component: withRoute(MyAccount)    },
        {path: "/cart",                component: Cart                    },
        {path: "/products",            component: ProductsPage            },
        {path: "/products/:url",       component: withRoute(ProductPage)  },
        {path: "/backstage-pass",      component: BackstagePass           },
    ]
}