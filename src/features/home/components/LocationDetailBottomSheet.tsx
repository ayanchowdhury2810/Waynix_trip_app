import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/src/components/IconSymbol';
import Tag from '@/src/components/Tag';
import Colors from '@/src/constants/Colors';
import CustomButton from '@/src/components/CustomButton';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence } from 'react-native-reanimated';
import ReviewCard from './ReviewCard';
import { Place } from '@/src/types/place';
import { REVIEWS_DATA } from '@/src/data/reviewsData';

interface LocationDetailBottomSheetProps {
    item: Place;
    onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOGGLE_PADDING = 24;
const TOGGLE_WIDTH = SCREEN_WIDTH - (TOGGLE_PADDING * 2);

const LocationDetailBottomSheet = ({ item, onClose }: LocationDetailBottomSheetProps) => {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'overview' | 'videos'>('overview');
    const [isLiked, setIsLiked] = useState(false);
    const tabAnimation = useSharedValue(0);
    const likeScale = useSharedValue(1);

    const handleTabPress = (tab: 'overview' | 'videos') => {
        setActiveTab(tab);
        tabAnimation.value = withTiming(tab === 'overview' ? 0 : 1, { duration: 300 });
    };

    const animatedTabStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabAnimation.value * (TOGGLE_WIDTH / 2) }],
        };
    });

    const handleLike = () => {
        setIsLiked(!isLiked);
        likeScale.value = withSequence(
            withTiming(1.3, { duration: 100 }),
            withTiming(1, { duration: 100 })
        );
    };

    const animatedLikeStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: likeScale.value }],
        };
    });

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const decimal = rating - fullStars;

        return (
            <View style={styles.starRatingContainer}>
                <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <IconSymbol key={`bg-${s}`} name="star.fill" size={16} color={Colors.border} />
                    ))}
                </View>
                <View style={[styles.starRow, styles.starForeground, { width: `${(rating / 5) * 100}%` }]}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <IconSymbol key={`fg-${s}`} name="star.fill" size={16} color={Colors.starGold} />
                    ))}
                </View>
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.contentPadding}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>{item.title}</Text>
                <View style={styles.sheetHeaderActions}>
                    <Pressable style={styles.iconButton} onPress={handleLike}>
                        <Animated.View style={animatedLikeStyle}>
                            <IconSymbol
                                name={isLiked ? "heart.fill" : "heart"}
                                size={20}
                                color={isLiked ? Colors.error : Colors.greyLight}
                            />
                        </Animated.View>
                    </Pressable>
                    <Pressable
                        style={styles.iconButton}
                        onPress={onClose}
                    >
                        <IconSymbol name="xmark" size={20} color={Colors.greyLight} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.sheetTags}>
                <View style={styles.tagContainer}>
                    {item.tags?.map((tag: string, index: number) => (
                        <Tag key={index} label={tag} />
                    ))}
                </View>
            </View>

            <View style={styles.toggleContainer}>
                <Animated.View style={[styles.toggleBackground, animatedTabStyle]} />
                <Pressable
                    style={styles.toggleButton}
                    onPress={() => handleTabPress('overview')}
                >
                    <Text style={[
                        styles.toggleText,
                        activeTab === 'overview' ? styles.activeToggleText : styles.inactiveToggleText
                    ]}>
                        Overview
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.toggleButton}
                    onPress={() => handleTabPress('videos')}
                >
                    <Text style={[
                        styles.toggleText,
                        activeTab === 'videos' ? styles.activeToggleText : styles.inactiveToggleText
                    ]}>
                        Videos
                    </Text>
                </Pressable>
            </View>

            {activeTab === 'overview' && (
                <>
                    <View style={styles.highlightCard}>
                        <Text style={styles.highlightTitle}>Why People's Choice?</Text>
                        <View style={styles.highlightList}>
                            <Text style={styles.highlightBullet}>• Explore the captivating trails.</Text>
                            <Text style={styles.highlightBullet}>• A haven for nature enthusiasts.</Text>
                            <Text style={styles.highlightBullet}>• Ascend through lush forests.</Text>
                            <Text style={styles.highlightBullet}>• Discover hidden waterfalls.</Text>
                            <Text style={styles.highlightBullet}>• Breathtaking panoramic views.</Text>
                        </View>
                    </View>

                    <View style={styles.statusRow}>
                        <View style={styles.statusPill}>
                            <IconSymbol name="clock.fill" size={18} color={Colors.starGold} />
                            <Text style={styles.statusText}>Closes Soon | 22:00 pm</Text>
                            <IconSymbol name="chevron.down" size={18} color={Colors.starGold} />
                        </View>
                        <Pressable style={styles.websitePill}>
                            <IconSymbol name="globe" size={18} color={Colors.info} />
                            <Text style={styles.websiteText}>Website</Text>
                        </Pressable>
                    </View>

                    <View style={styles.reviewSummarySection}>
                        <Text style={styles.reviewSummaryTitle}>Review Summary</Text>
                        <Text style={styles.reviewPoweredBy}>powered by Google</Text>
                        <View style={styles.reviewRatingRow}>
                            <Text style={styles.reviewRatingValue}>{item.rating}</Text>
                            {renderStars(item.rating)}
                            <Text style={styles.reviewCount}>({item.reviewCount.toLocaleString()})</Text>
                        </View>
                    </View>

                    <View style={styles.topReviewsSection}>
                        <Text style={styles.topReviewsTitle}>Top Reviews</Text>
                    </View>
                </>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={activeTab === 'overview' ? REVIEWS_DATA : []}
                renderItem={({ item: review }) => <ReviewCard {...review} />}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    activeTab === 'videos' ? (
                        <View style={styles.emptyStateContainer}>
                            <Text style={styles.emptyStateText}>No videos available at the moment</Text>
                        </View>
                    ) : null
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
                keyExtractor={(review) => review.id}
            />

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
                <CustomButton
                    title="Make Primary"
                    onPress={onClose}
                />
            </View>
        </View>
    );
};

export default LocationDetailBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentPadding: {
        paddingHorizontal: 24,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sheetHeaderActions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.dark,
    },
    sheetTags: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 14,
        marginBottom: 12,
        height: 48,
        position: 'relative',
        padding: 4,
    },
    toggleBackground: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: Colors.pinkLight,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.pinkBorderLight,
        top: 4,
        left: 4,
    },
    toggleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '600',
    },
    activeToggleText: {
        color: Colors.primary,
    },
    inactiveToggleText: {
        color: Colors.greyMedium,
    },
    highlightCard: {
        backgroundColor: Colors.pinkLight,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        marginBottom: 12,
    },
    highlightTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.primary,
        marginBottom: 5,
    },
    highlightList: {
        gap: 2,
    },
    highlightBullet: {
        fontSize: 16,
        color: Colors.primary,
        opacity: 0.8,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.gold,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: 6,
    },
    statusText: {
        color: Colors.starGold,
        fontSize: 15,
        fontWeight: '500',
    },
    websitePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.infoBackground,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: 6,
    },
    websiteText: {
        color: Colors.info,
        fontSize: 15,
        fontWeight: '500',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        rowGap: 4,
    },
    sheetDescription: {
        fontSize: 16,
        color: Colors.greyDark,
        lineHeight: 24,
        marginBottom: 24,
    },
    sheetInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        backgroundColor: Colors.surface,
        padding: 20,
        borderRadius: 20,
    },
    sheetInfoItem: {
        alignItems: 'center',
    },
    sheetInfoLabel: {
        fontSize: 12,
        color: Colors.greyMedium,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    sheetInfoValue: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.dark,
    },
    reviewSummarySection: {
        marginBottom: 12,
    },
    reviewSummaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.greyDark,
        marginBottom: 1,
    },
    reviewPoweredBy: {
        fontSize: 12,
        color: Colors.greyLight,
        marginBottom: 12,
    },
    reviewRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    reviewRatingValue: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.greyDark,
    },
    starRatingContainer: {
        position: 'relative',
        width: 90,
        height: 20,
        justifyContent: 'center',
    },
    starRow: {
        flexDirection: 'row',
        gap: 2,
        position: 'absolute',
        left: 0,
    },
    starForeground: {
        overflow: 'hidden',
        zIndex: 1,
    },
    reviewCount: {
        fontSize: 16,
        color: Colors.grey,
    },
    topReviewsSection: {
        marginBottom: 12,
    },
    topReviewsTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.greyDark,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    extraContent: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.dark,
        marginBottom: 12,
    },
    bulletItem: {
        fontSize: 16,
        color: Colors.greyDark,
        marginBottom: 8,
    },
    emptyStateContainer: {
        flex: 1,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: Colors.greyLight,
        fontWeight: '500',
    },
});
