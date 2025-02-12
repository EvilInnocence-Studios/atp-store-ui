import { Setter } from "unstateless";

export declare interface IBackstagePassProps {
    count: number;
    selectedOption: number;
    setSelectedOption: Setter<number>;
}

// What gets passed into the component from the parent as attributes
export declare interface IBackstagePassInputProps {

}

export type BackstagePassProps = IBackstagePassInputProps & IBackstagePassProps;