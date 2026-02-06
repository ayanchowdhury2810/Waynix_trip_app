// This file is a fallback for using SF Symbols on Android and Web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

const MAPPING = {
    // See MaterialIcons here: https://icons.expo.fyi
    // See SF Symbols in the SF Symbols app on Mac.
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
    'figure.walk': 'directions-walk',
    'plus': 'add',
    'person.fill': 'person',
    'star.fill': 'star',
    'mappin.and.ellipse': 'location-on',
} as Partial<
    Record<
        import('expo-symbols').SymbolViewProps['name'],
        React.ComponentProps<typeof MaterialIcons>['name']
    >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
    name,
    size = 24,
    color,
    style,
    weight,
}: {
    name: IconSymbolName;
    size?: number;
    color: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
    weight?: SymbolViewProps['weight'];
}) {
    if (process.env.EXPO_OS === 'ios') {
        return (
            <SymbolView
                weight={weight}
                tintColor={color}
                resizeMode="scaleAspectFit"
                name={name}
                style={[
                    {
                        width: size,
                        height: size,
                    },
                    style as any,
                ]}
            />
        );
    }
    return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
