import { View, Text, Image, StyleSheet } from "react-native";
import { Book } from "../types/Book";
//import { image } from "../services/openlib";
//book info card on search scr 
type bookProps = {
    book: Book;
}
export default function BookCard({ book }: bookProps) {

    return (
        <View style={styles.card}>
            {book.coverUrl ? (
                <Image source={{ uri: book.coverUrl }} style={styles.image} />
            ) : null}

            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author} numberOfLines={2}>Author: {book.authors?.join(", ") || "Unknown Author"}</Text>
        </View>
    );
}
//only show 2 line for author on card
//also show cover if available.
const styles = StyleSheet.create({
    card: {
        padding: 12,
        backgroundColor: "#fff",
        marginVertical: 8,
        borderRadius: 8,
        elevation: 3,
    },
    image: {
        height: 150,
        marginBottom: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    author: {
        marginTop: 4,
    },
});
