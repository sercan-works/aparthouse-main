export interface Apart {
    id: number;
    apart_name: string;
    slug: string;
    price: string;
    price_type: string;
    distances: [
        {   
            id: number;
            university: {
                id: number;
                name: string;
                city: {
                    id: number;
                    name: string;
                    country: string;
                    town:[{
                        id: number;
                        name: string;
                        city: number;
                    }]
                },
                country: string;
                address: string;
                lat: number;
                lng: number;
                apart_img: string;
            }
        }
    ];
    phone: string;
    meal: boolean;
    images: string[];
    favorite: boolean;
    whatsapp: string;
    sexuality: "male" | "female" | "mixed";
    is_viewed: boolean;
}

// Mock Apart Verileri
export const mockAparts: Apart[] = [
    {
        id: 1,
        apart_name: "Mono Kız Apart",
        slug: "mono-kiz-apart",
        price: "3500",
        price_type: "TL",
        distances: [
            {
                id: 1,
                university: {
                    id: 1,
                    name: "İstanbul Üniversitesi",
                    city: {
                        id: 1,
                        name: "İstanbul",
                        country: "Türkiye",
                        town: [{
                            id: 1,
                            name: "Fatih",
                            city: 1
                        }]
                    },
                    country: "Türkiye",
                    address: "Beyazıt, 34452 Fatih/İstanbul",
                    lat: 41.0122,
                    lng: 28.9760,
                    apart_img: "/assets/apart.jpg"
                }
            }
        ],
        phone: "+90 555 123 4567",
        meal: true,
        images: ["/assets/apart.jpg", "/assets/apart.jpg", "/assets/apart.jpg"],
        favorite: false,
        whatsapp: "+90 555 123 4567",
        sexuality: "female",
        is_viewed: false
    },
    {
        id: 2,
        apart_name: "Lüks Erkek Apart",
        slug: "luks-erkek-apart",
        price: "4200",
        price_type: "TL",
        distances: [
            {
                id: 2,
                university: {
                    id: 2,
                    name: "Yıldız Teknik Üniversitesi",
                    city: {
                        id: 1,
                        name: "İstanbul",
                        country: "Türkiye",
                        town: [{
                            id: 2,
                            name: "Beşiktaş",
                            city: 1
                        }]
                    },
                    country: "Türkiye",
                    address: "Yıldız, 34349 Beşiktaş/İstanbul",
                    lat: 41.0255,
                    lng: 29.0097,
                    apart_img: "/assets/apart.jpg"
                }
            }
        ],
        phone: "+90 555 987 6543",
        meal: true,
        images: ["/assets/apart.jpg", "/assets/apart.jpg", "/assets/apart.jpg"],
        favorite: true,
        whatsapp: "+90 555 987 6543",
        sexuality: "male",
        is_viewed: true
    },
    {
        id: 3,
        apart_name: "Ekonomik Karma Apart",
        slug: "ekonomik-karma-apart",
        price: "2800",
        price_type: "TL",
        distances: [
            {
                id: 3,
                university: {
                    id: 3,
                    name: "Boğaziçi Üniversitesi",
                    city: {
                        id: 1,
                        name: "İstanbul",
                        country: "Türkiye",
                        town: [{
                            id: 2,
                            name: "Beşiktaş",
                            city: 1
                        }]
                    },
                    country: "Türkiye",
                    address: "34342 Beşiktaş/İstanbul",
                    lat: 41.0850,
                    lng: 29.0514,
                    apart_img: "/assets/apart.jpg"
                }
            }
        ],
        phone: "+90 555 789 0123",
        meal: false,
        images: ["/assets/apart.jpg", "/assets/apart.jpg", "/assets/apart.jpg"],
        favorite: false,
        whatsapp: "+90 555 789 0123",
        sexuality: "mixed",
        is_viewed: false
    },
    {
        id: 4,
        apart_name: "Premium Kız Apart",
        slug: "premium-kiz-apart",
        price: "5000",
        price_type: "TL",
        distances: [
            {
                id: 4,
                university: {
                    id: 4,
                    name: "Marmara Üniversitesi",
                    city: {
                        id: 1,
                        name: "İstanbul",
                        country: "Türkiye",
                        town: [{
                            id: 3,
                            name: "Kadıköy",
                            city: 1
                        }]
                    },
                    country: "Türkiye",
                    address: "Göztepe, 34722 Kadıköy/İstanbul",
                    lat: 40.9769,
                    lng: 29.0562,
                    apart_img: "/assets/apart.jpg"
                }
            }
        ],
        phone: "+90 555 345 6789",
        meal: true,
        images: ["/assets/apart.jpg", "/assets/apart.jpg", "/assets/apart.jpg"],
        favorite: false,
        whatsapp: "+90 555 345 6789",
        sexuality: "female",
        is_viewed: true
    }
];
