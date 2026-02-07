import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/src/shared/components/IconSymbol';
import Tag from '@/src/shared/components/Tag';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ReviewCard from './ReviewCard';

interface LocationDetailBottomSheetProps {
    item: any;
    onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOGGLE_PADDING = 24;
const TOGGLE_WIDTH = SCREEN_WIDTH - (TOGGLE_PADDING * 2);

const REVIEWS_DATA = [
    {
        id: '1',
        name: "Sarabeth's",
        profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        rating: 5,
        price: '$$$$',
        tags: ['Brunch', 'Classic', 'Cozy'],
        description: "Start your day at Sarabeth's, a New York institution known for its exceptional brunch and cozy atmosphere.",
        images: [
            'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop',
        ],
    },
    {
        id: '2',
        name: "Clinton St. Baking",
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        rating: 4,
        price: '$$$',
        tags: ['Pancakes', 'Bakery', 'Popular'],
        description: "Best pancakes in the city. The wait is worth it for their blueberry pancakes and maple butter.",
        images: [
            'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=300&fit=crop',
        ],
    },
    {
        id: '3',
        name: "Jacob's Pickles",
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        rating: 5,
        price: '$$$',
        tags: ['Southern', 'Comfort Food', 'Brunch'],
        description: "Southern comfort food at its best. The biscuits and gravity are a must-try.",
        images: [
            'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1504387828074-ce794a645117?w=400&h=300&fit=crop',
        ],
    },
];

const LocationDetailBottomSheet = ({ item, onClose }: LocationDetailBottomSheetProps) => {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'overview' | 'videos'>('overview');
    const tabAnimation = useSharedValue(0);

    const handleTabPress = (tab: 'overview' | 'videos') => {
        setActiveTab(tab);
        tabAnimation.value = withTiming(tab === 'overview' ? 0 : 1, { duration: 300 });
    };

    const animatedTabStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabAnimation.value * (TOGGLE_WIDTH / 2) }],
        };
    });

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const decimal = rating - fullStars;

        return (
            <View style={styles.starRatingContainer}>
                {/* Background Stars (Gray) */}
                <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <IconSymbol key={`bg-${s}`} name="star.fill" size={16} color="#E9ECEF" />
                    ))}
                </View>
                {/* Foreground Stars (Yellow) */}
                <View style={[styles.starRow, styles.starForeground, { width: `${(rating / 5) * 100}%` }]}>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <IconSymbol key={`fg-${s}`} name="star.fill" size={16} color="#D4A017" />
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
                    <Pressable style={styles.iconButton}>
                        <IconSymbol name="heart" size={20} color="#ADB5BD" />
                    </Pressable>
                    <Pressable
                        style={styles.iconButton}
                        onPress={onClose}
                    >
                        <IconSymbol name="xmark" size={20} color="#ADB5BD" />
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
                    <IconSymbol name="clock.fill" size={18} color="#D4A017" />
                    <Text style={styles.statusText}>Closes Soon | 22:00 pm</Text>
                    <IconSymbol name="chevron.down" size={18} color="#D4A017" />
                </View>
                <Pressable style={styles.websitePill}>
                    <IconSymbol name="globe" size={18} color="#007AFF" />
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
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={REVIEWS_DATA}
                renderItem={({ item: review }) => <ReviewCard {...review} />}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
                keyExtractor={(review) => review.id}
            />

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 74) }]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.sheetButton,
                        pressed && { opacity: 0.8 }
                    ]}
                    onPress={onClose}
                >
                    <Text style={styles.sheetButtonText}>Add to Trip</Text>
                </Pressable>
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
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#212529',
    },
    sheetTags: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FA',
        borderRadius: 14,
        marginBottom: 24,
        height: 48,
        position: 'relative',
        padding: 4,
    },
    toggleBackground: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: '#FFF0F0',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFD1D1',
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
        color: '#D64045',
    },
    inactiveToggleText: {
        color: '#868E96',
    },
    highlightCard: {
        backgroundColor: '#FFF0F0',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    highlightTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#D64045',
        marginBottom: 12,
    },
    highlightList: {
        gap: 4,
    },
    highlightBullet: {
        fontSize: 16,
        color: '#D64045',
        opacity: 0.8,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 6,
    },
    statusText: {
        color: '#D4A017',
        fontSize: 15,
        fontWeight: '500',
    },
    websitePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7F3FF',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 6,
    },
    websiteText: {
        color: '#007AFF',
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
        color: '#495057',
        lineHeight: 24,
        marginBottom: 24,
    },
    sheetInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        backgroundColor: '#F8F9FA',
        padding: 20,
        borderRadius: 20,
    },
    sheetInfoItem: {
        alignItems: 'center',
    },
    sheetInfoLabel: {
        fontSize: 12,
        color: '#868E96',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    sheetInfoValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#212529',
    },
    reviewSummarySection: {
        marginBottom: 20,
    },
    reviewSummaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#495057',
        marginBottom: 2,
    },
    reviewPoweredBy: {
        fontSize: 12,
        color: '#ADB5BD',
        marginBottom: 12,
    },
    reviewRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    reviewRatingValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#495057',
    },
    starRatingContainer: {
        position: 'relative',
        width: 90, // 16 * 5 + gap
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
        color: '#6C757D',
    },
    topReviewsSection: {
        marginTop: 10,
        marginBottom: 16,
    },
    topReviewsTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#495057',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F3F5',
    },
    sheetButton: {
        backgroundColor: '#000000',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    sheetButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    extraContent: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212529',
        marginBottom: 12,
    },
    bulletItem: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 8,
    },
});
