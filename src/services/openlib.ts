import { Book } from "../types/Book";


export async function searchBooks(query: string): Promise<Book[]> {
    try {
        //fetch books from Open Library API only book info
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=30&fields=key,title,author_name,first_publish_year,cover_i,language,subject,person,place,subtitle`
        );
        if (!response.ok) {
            throw new Error("please try again later, \n open library is not responding"); //api miss
        }
        const data = await response.json();

        if (data.docs.length === 0) {
            console.error("incorrect title or author name");
            return [];
        }

        // Filter for relevance wrt year not get very old books
        const filter_books = data.docs
            .filter((doc: any) => {
                if (!doc.title || !doc.author_name?.[0]) { 
                    
                    return false;
                }
                const subjects = doc.subject || [];
                const subjectString = subjects.join(" ").toLowerCase();
                const nonFictionKeywords = [//non fiction keywords
                    "biography", "autobiography", "history", "science",
                    "mathematics", "physics", "chemistry", "biology",
                    "economics", "business", "self-help", "cookbook",
                    "travel", "guide", "manual", "textbook", "reference",
                    "encyclopedia", "dictionary", "journal", "diary",
                    "philosophy", "psychology", "sociology", "political"
                ];
                const isNonFiction = nonFictionKeywords.some(keyword =>
                    subjectString.includes(keyword)
                );

                if (doc.first_publish_year && doc.first_publish_year < 1970 && isNonFiction) return false;
                return true;
            })
            .sort((a: any, b: any) =>
                (b.first_publish_year || 0) - (a.first_publish_year || 0)
            )
            .slice(0, 15).map((doc: any, index: number) => ({ //TAKES 15
                id: doc.key || index.toString(),

                title: doc.title,
                authors: doc.author_name || ["Unknown"],
                year: doc.first_publish_year?.toString() || "N/A",
                coverUrl: doc.cover_i
                    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                    : undefined,

            }));
        return filter_books;
    }

    catch (error) {
        console.error("Network error", error);
        return [];
    }
}