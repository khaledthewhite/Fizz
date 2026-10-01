const products = [
    {
        id: 1,
        name: "كوكاكولا كلاسيك",
        description: "مشروب غازي منعش بالطعم الأصلي الرائع.",
        category: "cola",
        price: 7.00,
        oldPrice: null,
        discount: 0,
        rating: 4.8,
        reviewsCount: 120,
        image: "assets/images/cola.jpg",
        isNew: false
    },
    {
        id: 2,
        name: "فانتا برتقال",
        description: "مشروب غازي بنكهة البرتقال الطبيعية.",
        category: "orange",
        price: 4.00,
        oldPrice: 5.00,
        discount: 20,
        rating: 4.5,
        reviewsCount: 85,
        image: "assets/images/orange.jpg",
        isNew: false
    },
    {
        id: 3,
        name: "سبرايت ليمون",
        description: "انتعاش الليمون الحامض في كل رشفة.",
        category: "lemon",
        price: 5.00,
        oldPrice: null,
        discount: 0,
        rating: 4.7,
        reviewsCount: 92,
        image: "assets/images/lemon.jpg",
        isNew: true
    },
    {
        id: 4,
        name: "كولا زيرو",
        description: "نفس الطعم الرائع بدون سكر.",
        category: "cola",
        price: 7.50,
        oldPrice: 8.50,
        discount: 12,
        rating: 4.9,
        reviewsCount: 150,
        image: "assets/images/cola.jpg",
        isNew: false
    },
    {
        id: 5,
        name: "ميراندا حمضيات",
        description: "تشكيلة من الحمضيات المنعشة.",
        category: "orange",
        price: 4.50,
        oldPrice: 6.00,
        discount: 25,
        rating: 4.4,
        reviewsCount: 60,
        image: "assets/images/orange.jpg",
        isNew: false
    },
    {
        id: 6,
        name: "سفن أب",
        description: "مشروب شفاف بنكهة الليمون المنعش.",
        category: "lemon",
        price: 5.00,
        oldPrice: null,
        discount: 0,
        rating: 4.6,
        reviewsCount: 110,
        image: "assets/images/lemon.jpg",
        isNew: false
    }
];

const categories = [
    { id: "all", name: "الكل", icon: "fa-solid fa-bottle-droplet" },
    { id: "cola", name: "كولا", icon: "fa-solid fa-glass-water" },
    { id: "orange", name: "برتقال", icon: "fa-solid fa-lemon" },
    { id: "lemon", name: "ليمون", icon: "fa-solid fa-leaf" }
];
