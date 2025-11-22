export declare interface ICategoryLinksProps {
    links: {
        name: string;
        url: string;
    }[];
    showCategoryLinks: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface ICategoryLinksInputProps {
    classes?: any;
}

export type CategoryLinksProps = ICategoryLinksInputProps & ICategoryLinksProps;