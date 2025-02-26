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

export const aparts: Apart[] = [
    {
        id: 1,
        apart_name: "Öğrenci Residence",
        slug: "ogrenci-residence",
        price: "1000",
        price_type: "monthly",
        distances: [
            {
                id: 1,
                university: {
                    id: 1,
                    name: "Ankara University",
                    city: {
                        id: 1,
                        name: "Ankara",
                        country: "Turkey",
                        town: [
                            {
                                id: 1,
                                name: "Ankara",
                                city: 1
                            }
                        ]
                    },
                    country: "Turkey",
                    address: "Ankara University",
                    lat: 39.92073,
                    lng: 32.85411,
                    apart_img: "/images/residence1-1.jpg"
                }
            }
        ],  
        phone: "+90 555 123 4567",
        meal: true,
        images: [
            "/images/residence1-1.jpg",
            "/images/residence1-2.jpg",
            "/images/residence1-3.jpg"
        ],
        favorite: false,
        whatsapp: "+90 555 123 4567",
        sexuality: "male",
        is_viewed: false
    },
    
];
