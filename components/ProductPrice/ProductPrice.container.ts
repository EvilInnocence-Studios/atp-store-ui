import { getCalculator } from "@store-shared/discount/flatPercentage";
import { useDiscounts } from "@store/lib/discount/services";
import { createInjector, inject, mergeProps } from "unstateless";
import { ProductPriceComponent } from "./ProductPrice.component";
import { IProductPriceInputProps, IProductPriceProps, ProductPriceProps } from "./ProductPrice.d";
import { useLoggedInUser } from "@uac/lib/login/services";

const injectProductPriceProps = createInjector(({product}:IProductPriceInputProps):IProductPriceProps => {
    const [discounts, isLoading] = useDiscounts();
    const [user] = useLoggedInUser();

    const salePrice = discounts
        .map(discount => getCalculator(discount, user.permissions))
        .reduce((price, calculator) => calculator.productSalePrice(product, price), product.price);

    return {salePrice, isLoading};
});

const connect = inject<IProductPriceInputProps, ProductPriceProps>(mergeProps(
    injectProductPriceProps,
));

export const ProductPrice = connect(ProductPriceComponent);
