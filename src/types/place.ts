export interface Place {
    id: string;
    title: string;
    description: string;
    price: string;
    distance: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    address: string;
    imageUrl: string;
}

export interface ScheduleItemData {
    id: string;
    time: string;
    label: string;
}
