import { createInjector, inject, mergeProps } from "unstateless";
import {DiscountEditorComponent} from "./DiscountEditor.component";
import {IDiscountEditorInputProps, DiscountEditorProps, IDiscountEditorProps} from "./DiscountEditor.d";
import { useEffect, useState } from "react";
import { IDiscount } from "@store-shared/discount/types";
import { useLoaderAsync } from "@core/lib/useLoader";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { IPermission } from "@uac-shared/permissions/types";

const injectDiscountEditorProps = createInjector(({}:IDiscountEditorInputProps):IDiscountEditorProps => {
    const [discounts, setDiscounts] = useState<IDiscount[]>([]);
    const [permissions, setPermissions] = useState<IPermission[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(async () => {
            services().discount.search().then(setDiscounts);
        });
        loader(async () => {
            services().permission.search({}).then(setPermissions);
        });
    }, []);

    const update = (id:string, field:string) => (value:any) => {
        const oldDiscounts = discounts;
        setDiscounts(discounts.map(d => d.id === id ? {...d, [field]: value || null} : d));
        console.log(value);
        loader(async () => {
            services().discount.update(id, {[field]: value || null})
                .then(flash.success("Discount updated"))
                .catch(() => setDiscounts(oldDiscounts))
        });
    }

    const remove = (id:string) => () => {
        const oldDiscounts = discounts;
        setDiscounts(discounts.filter(d => d.id !== id));
        loader(async () => {
            services().discount.remove(id)
                .then(flash.success("Discount removed"))
                .catch(() => setDiscounts(oldDiscounts))
        });
    }

    const create = () => {
        loader(async () => {
            services().discount.create({name: "New Discount", type: "product", amount: 0})
                .then(flash.success("Discount created"))
                .then(services().discount.search().then(setDiscounts))
        });
    }
    
    return {discounts, permissions, isLoading: loader.isLoading, update, remove, create};
});

const connect = inject<IDiscountEditorInputProps, DiscountEditorProps>(mergeProps(
    injectDiscountEditorProps,
));

export const DiscountEditor = connect(DiscountEditorComponent);
