import { Review } from '../types/review';

export const REVIEWS_DATA: Review[] = [
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
