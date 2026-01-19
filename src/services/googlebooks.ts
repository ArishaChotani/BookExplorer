import { Book } from "../types/Book";

export async function bookdets(title: string): Promise<{

    year: string | null;
    description: string | null;
    reviews: string[];
    reviewCount: number;
    rating: number | null;
    ratingsCount: number | null;
}> {
    //google books API to fetch ratings & reviews
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
            title)}&maxResults=20&orderBy=relevance`
    );
    if (!response.ok) {
        throw new Error("google books is not responding,\n please try again later"); //api miss
    }
    const data = await response.json();
    if (data.totalItems > 0) {
        const book = data.items.find((item: any) => {
            const bookTitle = item.volumeInfo.title?.toLowerCase() || "";
            const searchTitle = title.toLowerCase();
            return bookTitle === searchTitle ||
                bookTitle.includes(searchTitle) ||
                searchTitle.includes(bookTitle);
        }) || data.items[0];
        const volumeInfo = book.volumeInfo;
        return {
            description: volumeInfo.description || "No description available",
            reviews: volumeInfo.textReviews || [],
            reviewCount: volumeInfo.reviewCount || 0,
            rating: volumeInfo.averageRating || null,
            ratingsCount: volumeInfo.ratingsCount || null,
            year: volumeInfo.publishedDate || null,
        };
    } else {
        return {
            rating: null,
            ratingsCount: null,
            description: null,
            reviews: [],
            reviewCount: 0,
            year: null,
            
        };
    }
}