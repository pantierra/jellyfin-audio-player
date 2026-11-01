import React from 'react';
import styled from 'styled-components/native';
import FastImage, { FastImageProps, Source } from '@d11/react-native-fast-image';
import { Dimensions, ImageStyle, StyleProp } from 'react-native';
import { useUserOrSystemScheme } from '@/components/Colors';

const Screen = Dimensions.get('screen');
export const AlbumWidth = Screen.width / 2 - 24;
export const AlbumHeight = AlbumWidth + 40;
export const CoverSize = AlbumWidth - 16;

export const AlbumItem = styled.View`
    width: ${AlbumWidth}px;
    height: ${AlbumHeight}px;
    padding: 8px;
`;

const Container = styled(FastImage)`
    border-radius: 10px;
    width: ${CoverSize}px;
    height: ${CoverSize}px;
    margin-bottom: 5px;
`;

export interface AlbumImageProps extends Omit<FastImageProps, 'style'> {
    source?: number | Omit<Source, 'uri'> & {
        uri?: string;
    };
    // NOTE: FastImage types its `style` prop using style types that React
    // Native no longer exports (since 0.88), which breaks its typing. Use
    // React Native's own `ImageStyle` here instead.
    style?: StyleProp<ImageStyle>;
}

const defaultImageDark = require('@/assets/images/empty-album-dark.png');
const defaultImageLight = require('@/assets/images/empty-album-light.png');

function AlbumImage({ style, ...rest }: AlbumImageProps) {
    const props = { ...rest, style: style as FastImageProps['style'] };
    const colorScheme = useUserOrSystemScheme();
    const defaultImage = colorScheme === 'light' ? defaultImageLight : defaultImageDark;

    // If no source is provided, use the default image as the main source
    if (!props.source || (typeof props.source === 'object' && 'uri' in props.source && !props.source.uri)) {
        return <Container {...props} source={defaultImage} />;
    }

    return (
        <Container
            {...props}
            defaultSource={defaultImage}
        />
    );
}

export default AlbumImage;