import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { bookdets } from "../services/googlebooks";
import { View } from "react-native";
//import { searchBooks } from "../services/openlib";

export default function BookDetailScr({ route }: any) {
    const { book } = route.params; // get the book objectfrom Search -> seatchscr
    console.log("Book Details:", book); //debug log

    const [rating, setRating] = useState<number | null>(null);
    const [ratingsCount, setRatingsCount] = useState<number>(0);
    const [year, setYear] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [reviews, setReviews] = useState<string>("");
    const [reviewCount, setReviewCount] = useState<number>(0);
    useEffect(() => {
        bookdets(book.title)
            .then((data) => {

                setRating(data.rating);
                setRatingsCount(data.ratingsCount || 0);
                setYear(data.year);
                setDescription(data.description);
                setReviews(data.reviews.join("\n\n"));
                setReviewCount(data.reviewCount);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [book.title]);
    //make a temp read status button to match figma des 
    const [isRead, setIsRead] = React.useState(false);
    const markasread = () => {
        setIsRead(!isRead);
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {book.title || "No Title"}</Text>

            {book.coverUrl && (
                <View style={styles.imageContainer}>
                <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.image}
                />
            </View>
            )}
            <Text style={styles.author}>
                Author(s): {book.authors?.join(", ") || "Unknown"}
            </Text>
            <Text >
                Published: {year ?? "Unknown"}</Text>
            <Text>
                Rating: {rating !== null && rating !== undefined ? rating.toFixed(1) : "No rating"} ★</Text>

            <Text style={styles.description}>
                Description: {description ?? "No description available"}
            </Text>
            <Text>
                Review Count: {reviewCount ?? 0} </Text>
            <Text style={styles.reviews}>
                Reviews: {reviews.length > 0 ? reviews : "No reviews available"}
            </Text>
            <TouchableOpacity
                style={[styles.button, isRead && styles.buttonActive]}
                onPress={markasread} >
                <Text style={styles.buttonText}>
                    {isRead ? "Mark as Unread" : "Mark as Read"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        alignItems: "center",
    },
    author: {
        fontSize: 16,
        marginBottom: 5,
    },
    imageContainer: {
        alignItems: "center",      
        justifyContent: "center", 
        marginVertical: 20,          
    },
    image: {
        width: 150,
        height: 220,
        marginBottom: 15,
        borderRadius: 15,
        alignItems: "center",
    },
    published: {
        fontSize: 14,
        marginBottom: 5,
        color: "#555",
    },
    rating: {
        fontSize: 14,
        marginBottom: 10,
        color: "#555",
        alignItems: "center",
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        alignItems: "flex-start",
    },
    ratingsCount: {
        fontSize: 14,
        marginBottom: 10,
        color: "#555",
        alignItems: "center",
    },
    reviews: {
        fontSize: 14,
        lineHeight: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonActive: {
        backgroundColor: "#34C759",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
