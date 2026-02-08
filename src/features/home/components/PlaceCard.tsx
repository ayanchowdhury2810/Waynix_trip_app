import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Tag from '../../../components/Tag';
import { IconSymbol } from '../../../components/IconSymbol';
import Colors from '../../../constants/Colors';

interface PlaceCardProps {
    title: string;
    description: string;
    price: string;
    distance: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    onPress?: () => void;
}

const PlaceCard = ({
    title,
    description,
    price,
    distance,
    rating,
    reviewCount,
    tags,
    onPress,
}: PlaceCardProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
            ]}
            onPress={onPress}
        >
            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.rightInfo}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.distance}>{distance}</Text>
                </View>
            </View>

            <Text style={styles.description}>{description}</Text>

            <View style={styles.bottomRow}>
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <Tag key={index} label={tag} />
                    ))}
                </View>
                <View style={styles.ratingContainer}>
                    <IconSymbol name="star.fill" size={16} color={Colors.starYellow} />
                    <Text style={styles.ratingText}>{rating}</Text>
                    <Text style={styles.reviewCount}>({reviewCount.toLocaleString()})</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default React.memo(PlaceCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.dark,
    },
    rightInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 14,
        color: Colors.greyLighter, // Light grey for the $$$
        marginRight: 10,
    },
    distance: {
        fontSize: 14,
        color: Colors.grey,
    },
    description: {
        fontSize: 14,
        color: Colors.greyMedium,
        lineHeight: 16,
        marginBottom: 6,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        rowGap: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: Colors.grey,
        marginLeft: 4,
        textDecorationLine: 'underline',
    },
    reviewCount: {
        fontSize: 14,
        color: Colors.grey,
        marginLeft: 2,
        textDecorationLine: 'underline',
    },
});
