import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Tag from '../../../components/Tag';
import { IconSymbol } from '../../../components/IconSymbol';
import Colors from '../../../constants/Colors';
import { BlurView } from 'expo-blur';

interface RecommendationCardProps {
    title: string;
    description: string;
    price: string;
    distance: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    address: string;
    imageUrl?: string;
    onPress?: () => void;
}

const RecommendationCard = ({
    title,
    description,
    price,
    distance,
    rating,
    reviewCount,
    tags,
    address,
    imageUrl = 'https://picsum.photos/200/300', // Placeholder
    onPress,
}: RecommendationCardProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
            ]}
            onPress={onPress}
        >
            <View style={styles.contentRow}>
                {/* Left Side: Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <BlurView intensity={60} tint="dark" style={styles.badge}>
                        <Text style={styles.badgeText} numberOfLines={1} ellipsizeMode="tail">Recommended</Text>
                    </BlurView>
                </View>

                {/* Right Side: Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <Text style={styles.distance}>{distance}</Text>
                    </View>

                    <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
                        {description}
                    </Text>

                    <View style={styles.tagsRow}>
                        {tags.map((tag, index) => (
                            <Tag key={index} label={tag} />
                        ))}
                    </View>

                    <View style={styles.ratingAndPriceRow}>
                        <View style={styles.ratingContainer}>
                            <IconSymbol name="star.fill" size={24} color={Colors.starYellow} />
                            <Text style={styles.ratingText}>{rating}</Text>
                            <Text style={styles.reviewCount}>({reviewCount.toLocaleString()})</Text>
                        </View>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                </View>
            </View>

            {/* Bottom Row: Address */}
            <View style={styles.divider} />
            <Pressable style={styles.addressContainer}>
                <IconSymbol name="mappin.and.ellipse" size={20} color={Colors.greyLight} />
                <Text style={styles.addressText}>{address}</Text>
            </Pressable>
        </Pressable>
    );
};

export default React.memo(RecommendationCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 12,
        marginBottom: 16,
        marginHorizontal: 20,
        // Added shadow for premium look
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    contentRow: {
        flexDirection: 'row',
    },
    imageContainer: {
        width: 80,
        height: 140,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badge: {
        position: 'absolute',
        top: 3,
        alignSelf: 'center',
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 16,
        overflow: 'hidden', // Essential for BlurView borderRadius
    },
    badgeText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: '600',
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.dark,
        flex: 1,
        marginRight: 4,
    },
    distance: {
        fontSize: 14,
        color: Colors.greyMedium,
        fontWeight: '400',
    },
    description: {
        fontSize: 14,
        color: Colors.greyMedium,
        lineHeight: 16,
        marginBottom: 5,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 4,
    },
    ratingAndPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 16,
        color: Colors.greyMedium,
        marginLeft: 4,
        textDecorationLine: 'underline',
    },
    reviewCount: {
        fontSize: 16,
        color: Colors.greyMedium,
        marginLeft: 2,
        textDecorationLine: 'underline',
    },
    price: {
        fontSize: 20,
        color: Colors.greyLightest, // Light gray for the $$$
        fontWeight: '300',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: 12,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressText: {
        fontSize: 14,
        color: Colors.greyMedium,
        marginLeft: 8,
        textDecorationLine: 'underline',
    },
});
