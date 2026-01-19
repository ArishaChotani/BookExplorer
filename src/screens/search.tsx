import React, { useEffect, useState } from "react";
import { Book } from "../types/Book";
import BookCard from "../comp/bookcard";
import { searchBooks } from "../services/openlib"; // our API service
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, } from "react-native";
import { bookdets } from "../services/googlebooks";
//use open lib for book card
export default function SearchScr({ navigation }: any): React.JSX.Element {
    const [query, setQuery] = useState(""); // user types query
    const [books, setBooks] = useState<Book[]>([]); // list of books fetch
    const [loading, setLoading] = useState(false); //loading mess
    const [error, setError] = useState(""); // error mess

    useEffect(() => { //as query changes
        if (query.length < 1) { //start searching after even 1 charr 
            setBooks([]);
            return;
        }
        else {
            setError(
            "No results exists.")
        }
        setLoading(true);
        setError("");
        searchBooks(query)
        //bookdets(query)
            .then((results) => {
                setBooks(results);

            })
            .catch((err) => {
                setError(err.message || "Unable to load books");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="book title or authors..." //input
                value={query}
                onChangeText={setQuery} // updat query state
            />
            {loading && <Text style={{ color: "blue" }}>Loading...</Text>}
            {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

            <FlatList
                data={books}
                keyExtractor={(item) => item.id} // unique key for each item
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Details", { book: item })}>
                        <BookCard book={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

//styless beloww
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    input: {
        borderWidth: 1,
        borderColor: "#999",
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
    },
    bookCard: {
        padding: 10,
        marginBottom: 8,
        backgroundColor: "#f2f2f2",
        borderRadius: 5,
    },
});
