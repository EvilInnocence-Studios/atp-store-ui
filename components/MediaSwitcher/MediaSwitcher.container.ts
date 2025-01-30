import { createInjector, inject, mergeProps } from "unstateless";
import {MediaSwitcherComponent} from "./MediaSwitcher.component";
import {IMediaSwitcherInputProps, MediaSwitcherProps, IMediaSwitcherProps} from "./MediaSwitcher.d";
import { useState } from "react";

const injectMediaSwitcherProps = createInjector(({media, defaultMediaId}:IMediaSwitcherInputProps):IMediaSwitcherProps => {
    const [curImage, setCurImage] = useState(
        defaultMediaId && media.length > 0 && media.find((mediaItem) => mediaItem.id === defaultMediaId)
            ? media.findIndex((mediaItem) => mediaItem.id === defaultMediaId)
            : 0
    );
    const next = () => setCurImage((curImage + 1) % media.length);
    const prev = () => setCurImage((curImage + media.length - 1) % media.length);

    return {curImage, next, prev, setCurImage};
});

const connect = inject<IMediaSwitcherInputProps, MediaSwitcherProps>(mergeProps(
    injectMediaSwitcherProps,
));

export const MediaSwitcher = connect(MediaSwitcherComponent);
