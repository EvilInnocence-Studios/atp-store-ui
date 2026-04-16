import { overridable } from "@core/lib/overridable";
import { injectProductContextProps, IProductContextProps } from "@store/lib/context";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import { createInjector, inject, mergeProps } from "unstateless";
import icon from './icon.svg';
import { ProductPriceComponent } from "./ProductPrice.component";
import { IProductPriceInputProps, IProductPriceProps, ProductPriceProps } from "./ProductPrice.d";
import { ProductPriceLayoutEditor } from "./ProductPrice.layout";
import { ProductPricePropEditor } from "./ProductPrice.props";
import { useDiscounts } from "@store/lib/discount/services";
import { useLoggedInUser } from "@uac/lib/login/services";
import { getCalculator } from "@store-shared/discount/flatPercentage";

const injectProductPriceProps = createInjector(({product}:IProductPriceInputProps & IProductContextProps):IProductPriceProps => {
    const [discounts, isLoading] = useDiscounts();
    const [user] = useLoggedInUser();

    const salePrice = product ? discounts
        .map(discount => getCalculator(discount, user.permissions))
        .reduce((price, calculator) => calculator.productSalePrice(product, price), product.price) : 0.00;

    return {salePrice, isLoading};
});

const connect = inject<IProductPriceInputProps, ProductPriceProps>(mergeProps(
    injectProductContextProps,
    injectProductPriceProps,
));
export const connectProductPrice = connect;

export const ProductPrice = withLayoutMetadata(
    overridable<IProductPriceInputProps>(connect(ProductPriceComponent)),
    {
        name: "ProductPrice",
        displayName: "Product Price",
        category: "Store",
        subCategory: "Product",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        layoutEditor: ProductPriceLayoutEditor,
        propEditor: ProductPricePropEditor,
    }
);
