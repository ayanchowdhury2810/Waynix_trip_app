import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import Tag from '@/src/components/Tag';
import { IconSymbol } from '@/src/components/IconSymbol';
import Colors from '@/src/constants/Colors';
import { Review } from '@/src/types/review';

interface ReviewCardProps extends Review { }

const ReviewCard = ({
    name,
    profileImage,
    rating,
    price,
    tags,
    description,
    images,
}: ReviewCardProps) => {
    const renderStars = (rating: number) => {
        return (
            <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                    <IconSymbol
                        key={s}
                        name="star.fill"
                        size={14}
                        color={s <= rating ? Colors.starGold : Colors.border}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftCol}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
            </View>
            <View style={styles.rightCol}>
                <View style={styles.header}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.ratingRow}>
                        {renderStars(rating)}
                        <Text style={styles.price}>{price}</Text>
                    </View>
                </View>

                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <Tag key={index} label={tag} variant="secondary" />
                    ))}
                </View>

                <Text style={styles.description} numberOfLines={3}>
                    {description}
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.imageScrollContent}
                    style={styles.imageScroll}
                >
                    {images.map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={styles.galleryImage} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default ReviewCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    leftCol: {
        marginRight: 16,
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.border,
    },
    rightCol: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.greyMedium,
    },
    ratingRow: {
        alignItems: 'flex-end',
    },
    starRow: {
        flexDirection: 'row',
        gap: 2,
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        color: Colors.greyLighter, // Light grey for the $$$
        fontWeight: '500',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: Colors.greyDark,
        lineHeight: 20,
        marginBottom: 12,
    },
    imageScroll: {
        marginRight: -24, // Allow scroll to screen edge
    },
    imageScrollContent: {
        paddingRight: 24,
        gap: 12,
    },
    galleryImage: {
        width: 140,
        height: 100,
        borderRadius: 12,
        backgroundColor: Colors.border,
    },
});
