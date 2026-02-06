import { View, Text, StyleSheet, FlatList, Dimensions, Pressable } from 'react-native';
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../shared/components/CommonHeader';
import ScheduleItem from './components/ScheduleItem';
import RecommendationCard from './components/RecommendationCard';
import PlaceCard from './components/PlaceCard';
import AskAnythingOverlay from './components/AskAnythingOverlay';
import BottomSheet, { BottomSheetRef } from '../../shared/components/BottomSheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SCHEDULE_DATA = [
    { id: '1', time: '9:30am - 10:30am', label: 'Breakfast' },
    { id: '2', time: '9am - 1pm', label: 'Activity 1' },
    { id: '3', time: '9:30am - 10:30am', label: 'Lunch' },
    { id: '4', time: '9:30am - 10:30am', label: 'Breakfast' },
];

const PLACES_DATA = [
    {
        id: '1',
        title: 'Saracen Summit',
        description: "Explore Saracen Summit's winding trails, perfect for a morning walk.",
        price: '$$$',
        distance: '0.8mi',
        rating: 4.6,
        reviewCount: 9285,
        tags: ['Creole', 'Brunch', 'Coffee'],
        address: '123 Peak View, Highland, NY',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
    },
    {
        id: '2',
        title: 'Cedar Canyon',
        description: 'Explore the lush landscapes of Cedar Canyon while enjoying birdwatching opportunities.',
        price: '$$$',
        distance: '2.0mi',
        rating: 4.5,
        reviewCount: 9562,
        tags: ['Mexican', 'Mediterranean', 'Thai'],
        address: '456 Valley Road, Greenfield, UT',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop',
    },
    {
        id: '3',
        title: 'Mount Aerilon',
        description: 'Hike the scenic trails of Mount Aerilon and discover breathtaking panoramic views.',
        price: '$$$',
        distance: '1.2mi',
        rating: 4.8,
        reviewCount: 14829,
        tags: ['Indian', 'Italian', 'Japanese', 'Mediterranean', 'Thai'],
        address: '228 Park Ave South, New York, NY',
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=600&fit=crop', // Cafe image
    },
];

const HomeScreen = () => {
    const [selectedId, setSelectedId] = useState<string | null>(SCHEDULE_DATA[0].id);
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handlePress = useCallback((item: any) => {
        setSelectedItem(item);
        bottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT / 2);
    }, []);

    const buildScreenData = () => {
        return [
            { type: 'calendar' },
            { type: 'schedule' },
            { type: 'recommendation' },
            { type: 'sectionHeader', title: "People's Favorite" },
            ...PLACES_DATA.map(item => ({ type: 'place', ...item })),
        ];
    };

    const screenData = useMemo(() => buildScreenData(), []);

    const renderItem = useCallback(({ item }: { item: any }) => {
        switch (item.type) {
            case 'calendar':
                return (
                    <View style={styles.calendarContainer}>
                        <View style={styles.monthColumn}>
                            <Text style={styles.monthText}>D{'\n'}E{'\n'}C</Text>
                        </View>
                        <View style={styles.daysRow}>
                            <View style={[styles.dayCircle, styles.activeDay]}>
                                <Text style={styles.dayLetterActive}>M</Text>
                                <Text style={styles.dayNumberActive}>1</Text>
                            </View>
                            <View style={styles.dayCircle}>
                                <Text style={styles.dayLetter}>T</Text>
                                <Text style={styles.dayNumber}>2</Text>
                            </View>
                            <View style={styles.dayCircle}>
                                <Text style={styles.dayLetter}>W</Text>
                                <Text style={styles.dayNumber}>3</Text>
                            </View>
                        </View>
                    </View>
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
    }, [selectedId, handlePress]);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <CommonHeader />

            <FlatList
                data={screenData}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 160 }}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={9}
                removeClippedSubviews
            />

            <AskAnythingOverlay />

            <BottomSheet ref={bottomSheetRef}>
                <View style={styles.bottomSheetContent}>
                    {selectedItem && (
                        <>
                            <Text style={styles.sheetTitle}>{selectedItem.title}</Text>
                            <Text style={styles.sheetDescription}>{selectedItem.description}</Text>

                            <View style={styles.sheetInfoRow}>
                                <View style={styles.sheetInfoItem}>
                                    <Text style={styles.sheetInfoLabel}>Price</Text>
                                    <Text style={styles.sheetInfoValue}>{selectedItem.price}</Text>
                                </View>
                                <View style={styles.sheetInfoItem}>
                                    <Text style={styles.sheetInfoLabel}>Distance</Text>
                                    <Text style={styles.sheetInfoValue}>{selectedItem.distance}</Text>
                                </View>
                                <View style={styles.sheetInfoItem}>
                                    <Text style={styles.sheetInfoLabel}>Rating</Text>
                                    <Text style={styles.sheetInfoValue}>⭐ {selectedItem.rating}</Text>
                                </View>
                            </View>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.sheetButton,
                                    pressed && { opacity: 0.8 }
                                ]}
                                onPress={() => bottomSheetRef.current?.scrollTo(0)}
                            >
                                <Text style={styles.sheetButtonText}>Add to Trip</Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    calendarContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    monthColumn: {
        marginRight: 15,
    },
    monthText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#6C757D',
        textAlign: 'center',
    },
    daysRow: {
        flexDirection: 'row',
    },
    dayCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    activeDay: {
        backgroundColor: 'white',
        borderColor: '#FFD1D1',
    },
    dayLetter: {
        fontSize: 10,
        color: '#ADB5BD',
    },
    dayNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212529',
    },
    dayLetterActive: {
        fontSize: 10,
        color: '#D64045',
    },
    dayNumberActive: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D64045',
    },
    listContainer: {
        marginTop: 20,
        marginBottom: 24,
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
        color: '#6C757D',
        fontWeight: '400',
    },
    moreOptions: {
        fontSize: 18,
        color: '#6C757D',
        letterSpacing: 2,
    },
    bottomSheetContent: {
        padding: 24,
        flex: 1,
    },
    sheetTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#212529',
        marginBottom: 12,
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
});
