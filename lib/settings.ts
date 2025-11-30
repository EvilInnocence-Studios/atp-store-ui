import { ISettingContainer } from "@common/lib/setting/types";

export const storeSettings:ISettingContainer = {
    Store: {
        General: {
            defaultProductSku: {
                displayName: "Default Product SKU",
                type: "string",
                defaultValue: "",
                description: "The default SKU to use for new products.",
            },
            productImageFolder: {
                displayName: "Product Image Folder",
                type: "string",
                defaultValue: "",
                description: "The folder where product images are stored.",
            },
            "store.showFilterBar": {
                displayName: "Show Filter Bar",
                type: "boolean",
                defaultValue: "true",
                description: "Show the filter bar on product listing pages.",
            }
        },
        Search: {
            defaultProductSortBy: {
                displayName: "Default Sort By",
                type: "select",
                defaultValue: "newest",
                description: "The default sorting order for product listings.",
                options: () => Promise.resolve([
                    { value: "newest", label: "Newest" },
                    { value: "oldest", label: "Oldest" },
                    { value: "priceLow", label: "Price: Low to High" },
                    { value: "priceHigh", label: "Price: High to Low" },
                ]),
            },
            defaultProductPerPage: {
                displayName: "Default Products Per Page",
                type: "string",
                defaultValue: "12",
                description: "The default number of products displayed per page.",
            },
        },
        "Product Listing": {
            "store.showCategoryLinks": {
                displayName: "Show Category Links",
                type: "boolean",
                defaultValue: "true",
                description: "Show category links on product listings.",
            },
            "store.showSortBySelector": {
                displayName: "Show Sort By Selector",
                type: "boolean",
                defaultValue: "true",
                description: "Show the products sort by selector on product listings.",
            },
            "store.fiveColumnMinWidth": {
                displayName: "Five Column Min Width",
                type: "string",
                defaultValue: "1200px",
                description: "The minimum width for five-column product listings.",
            },
            "store.fourColumnMinWidth": {
                displayName: "Four Column Min Width",
                type: "string",
                defaultValue: "992px",
                description: "The minimum width for four-column product listings.",
            },
            "store.threeColumnMinWidth": {
                displayName: "Three Column Min Width",
                type: "string",
                defaultValue: "768px",
                description: "The minimum width for three-column product listings.",
            },
            "store.twoColumnMinWidth": {
                displayName: "Two Column Min Width",
                type: "string",
                defaultValue: "576px",
                description: "The minimum width for two-column product listings.",
            },
        }
    },
    Email: {
        "Order Confirmation": {
            orderConfirmationSubject: {
                displayName: "Order Confirmation Subject",
                type: "string",
                defaultValue: "Order Confirmation",
                description: "The subject line for order confirmation emails.",
            }
        }
    },
};
