import { overridable } from "@core/lib/overridable";
import { ProductIdContext } from "@store/lib/context";
import { Layout } from "@theming/components/Layout";
import { Spin } from "antd";
import { ProductPageProps } from "./ProductPage.d";

const Provider = ProductIdContext.Provider;

export const ProductPageComponent = overridable(({ product, isLoading }: ProductPageProps) =>
    <Spin spinning={isLoading}>
        <Provider value={product?.id || ""}>
            <Layout element="productPage" />
        </Provider>
    </Spin>
);
