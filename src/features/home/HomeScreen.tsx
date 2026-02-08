import { View, Text, StyleSheet, FlatList, Dimensions, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../components/CommonHeader';
import HorizontalCalendar from '../../components/HorizontalCalendar';
import ScheduleItem from './components/ScheduleItem';
import RecommendationCard from './components/RecommendationCard';
import PlaceCard from './components/PlaceCard';
import AskAnythingOverlay from './components/AskAnythingOverlay';
import BottomSheet, { BottomSheetRef } from '../../components/BottomSheet';
import LocationDetailBottomSheet from './components/LocationDetailBottomSheet';
import Colors from '../../constants/Colors';
import { SCHEDULE_DATA, PLACES_DATA } from '../../data/homeData';
import { Place } from '../../types/place';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = () => {
    const [selectedId, setSelectedId] = useState<string | null>(SCHEDULE_DATA[0].id);
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const [selectedItem, setSelectedItem] = useState<Place | null>(null);

    // Pagination States
    const [displayedPlaces, setDisplayedPlaces] = useState<Place[]>(PLACES_DATA.slice(0, 10));
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handlePress = useCallback((item: any) => {
        setSelectedItem(item);
        bottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT * 0.8);
    }, []);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setDisplayedPlaces(PLACES_DATA.slice(0, 10));
        setRefreshing(false);
    }, []);

    const loadMore = useCallback(async () => {
        if (loadingMore || displayedPlaces.length >= PLACES_DATA.length) return;

        setLoadingMore(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const nextBatch = PLACES_DATA.slice(displayedPlaces.length, displayedPlaces.length + 10);
        setDisplayedPlaces(prev => [...prev, ...nextBatch]);
        setLoadingMore(false);
    }, [loadingMore, displayedPlaces.length]);

    const buildScreenData = useCallback(() => {
        return [
            { type: 'calendar' },
            { type: 'schedule' },
            { type: 'recommendation' },
            { type: 'sectionHeader', title: "People's Favorite" },
            ...displayedPlaces.map(item => ({ type: 'place', ...item })),
        ];
    }, [displayedPlaces]);

    const screenData = useMemo(() => buildScreenData(), [buildScreenData]);

    const renderItem = useCallback(({ item }: { item: any }) => {
        switch (item.type) {
            case 'calendar':
                return (
                    <HorizontalCalendar
                        onDateSelect={(date) => console.log('Selected date:', date)}
                    />
                );

            case 'schedule':
                return (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={SCHEDULE_DATA}
                            horizontal
                            keyExtractor={i => i.id}
                            renderItem={({ item: sItem }) => (
                                <ScheduleItem
                                    time={sItem.time}
                                    label={sItem.label}
                                    isSelected={sItem.id === selectedId}
                                    onPress={() => setSelectedId(sItem.id)}
                                />
                            )}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalListContent}
                        />
                    </View>
                );

            case 'recommendation':
                return (
                    <RecommendationCard
                        {...PLACES_DATA[2]}
                        onPress={() => handlePress(PLACES_DATA[2])}
                    />
                );

            case 'sectionHeader':
                return (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{item.title}</Text>
                        <Text style={styles.moreOptions}>•••</Text>
                    </View>
                );

            case 'place':
                return <PlaceCard {...item} onPress={() => handlePress(item)} />;
            default:
                return null;
        }
    }, [selectedId, handlePress, displayedPlaces]);

    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <CommonHeader />

            <FlatList
                data={screenData}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 160 }}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={9}
                removeClippedSubviews
            />

            <AskAnythingOverlay />

            <BottomSheet
                ref={bottomSheetRef}
                style={{ height: SCREEN_HEIGHT * 0.8 }}
            >
                {selectedItem && (
                    <LocationDetailBottomSheet
                        item={selectedItem}
                        onClose={() => bottomSheetRef.current?.scrollTo(0)}
                    />
                )}
            </BottomSheet>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    listContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    horizontalListContent: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 15,
        color: Colors.grey,
        fontWeight: '400',
    },
    moreOptions: {
        fontSize: 18,
        color: Colors.grey,
        letterSpacing: 2,
    },
    bottomSheetContent: {
        paddingHorizontal: 24,
        flex: 1,
    },
    loaderContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
});
