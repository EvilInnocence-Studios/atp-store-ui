export declare interface IProductQueueProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IProductQueueInputProps {
    groupId: string;
    tagId: string;
}

export type ProductQueueProps = IProductQueueInputProps & IProductQueueProps;