import { createInjector, inject, mergeProps } from "unstateless";
import {CreateOrderFormComponent} from "./CreateOrderForm.component";
import {ICreateOrderFormInputProps, CreateOrderFormProps, ICreateOrderFormProps} from "./CreateOrderForm.d";
import { useModal } from "@core/lib/useModal";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useArray } from "@core/lib/useArray";
import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";

const injectCreateOrderFormProps = createInjector(({userId, onCreateOrder}:ICreateOrderFormInputProps):ICreateOrderFormProps => {
    const modal = useModal();
    const loader = useLoaderAsync();
    const products = useArray<string>([]);

    const createOrder = () => {
        loader(async () => {
            services().order.create(userId, products.items)
            .then(order => {
                flash.success("Order created successfully")();
                modal.close();
                products.clear();
                if (onCreateOrder) {
                    onCreateOrder(order.id);
                }
            });
        });
    }

    return {modal, isLoading: loader.isLoading, products, createOrder};
});

const connect = inject<ICreateOrderFormInputProps, CreateOrderFormProps>(mergeProps(
    injectCreateOrderFormProps,
));

export const CreateOrderForm = connect(CreateOrderFormComponent);
