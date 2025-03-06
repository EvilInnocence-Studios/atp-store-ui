export declare interface ICategoryLinksProps {
    links: {
        name: string;
        url: string;
    }[];
}

// What gets passed into the component from the parent as attributes
export declare interface ICategoryLinksInputProps {

}

export type CategoryLinksProps = ICategoryLinksInputProps & ICategoryLinksProps;