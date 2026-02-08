import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ViewToken } from 'react-native';
import Colors from '../constants/Colors';

interface DayItem {
    date: Date;
    dayLetter: string;
    dayNumber: number;
    month: string;
    id: string;
}

interface HorizontalCalendarProps {
    onDateSelect?: (date: Date) => void;
    initialSelectedDate?: Date;
}

const generateDaysFromToday = (numDays: number) => {
    const days: DayItem[] = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        days.push({
            date,
            dayLetter: date.toLocaleDateString("en-US", { weekday: "narrow" }),
            dayNumber: date.getDate(),
            month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
            id: getLocalDateId(date),
        });
    }

    return days;
};

const HorizontalCalendar: React.FC<HorizontalCalendarProps> = ({ onDateSelect, initialSelectedDate }) => {
    const days = useMemo(() => generateDaysFromToday(365), []);
    const [selectedId, setSelectedId] = useState<string>(
        (initialSelectedDate || new Date()).toISOString().split('T')[0]
    );
    const [currentMonth, setCurrentMonth] = useState<string>(days[0].month);

    const handleDatePress = (item: DayItem) => {
        setSelectedId(item.id);
        onDateSelect?.(item.date);
    };

    const initialIndex = useMemo(() => {
        const idx = days.findIndex(d => d.id === selectedId);
        return idx >= 0 ? idx : 0;
    }, [days, selectedId]);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const firstVisible = viewableItems[0].item as DayItem;
            setCurrentMonth(firstVisible.month);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderDay = useCallback(({ item }: { item: DayItem }) => {
        const isSelected = item.id === selectedId;
        return (
            <Pressable
                onPress={() => handleDatePress(item)}
                style={[styles.dayCircle, isSelected && styles.activeDay]}
            >
                <Text style={[styles.dayLetter, isSelected && styles.dayLetterActive]}>
                    {item.dayLetter}
                </Text>
                <Text style={[styles.dayNumber, isSelected && styles.dayNumberActive]}>
                    {item.dayNumber}
                </Text>
            </Pressable>
        );
    }, [selectedId]);

    const formattedMonth = currentMonth.split('').join('\n');

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.monthColumn}>
                <Text style={styles.monthText}>{formattedMonth}</Text>
            </View>
            <View style={styles.listWrapper}>
                <FlatList
                    data={days}
                    renderItem={renderDay}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    contentContainerStyle={styles.daysListContent}
                    initialScrollIndex={initialIndex}
                    getItemLayout={(_, index) => ({
                        length: 55, // 45 width + 10 margin
                        offset: 55 * index,
                        index,
                    })}
                />
            </View>
        </View>
    );
};

export default HorizontalCalendar;

const styles = StyleSheet.create({
    calendarContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        marginTop: 10,
        alignItems: 'center',
        height: 60,
    },
    monthColumn: {
        width: 30,
        marginRight: 10,
        justifyContent: 'center',
    },
    monthText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.grey,
        textAlign: 'center',
        lineHeight: 18,
    },
    listWrapper: {
        flex: 1,
    },
    daysListContent: {
        paddingRight: 20,
    },
    dayCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    activeDay: {
        backgroundColor: Colors.pinkLight,
        borderColor: Colors.pinkBorderLight,
    },
    dayLetter: {
        fontSize: 10,
        color: Colors.greyLight,
    },
    dayNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark,
    },
    dayLetterActive: {
        fontSize: 10,
        color: Colors.primary,
    },
    dayNumberActive: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
    },
});
const getLocalDateId = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};


