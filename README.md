##Book Explorer App 

## project setup 
using this command : npx create-expo-app BookExplorer --template expo-template-blank-typescript

then a src directory in this BookExpolorer and setup a skeleton of the files required and their functionalities in src/app.

## Overview
Book Explorer is a app built using react, Expo and TypeScript. The app allows to search for books and view  information including book title, author name, publication year, cover image, and ratings.
note : i have limited my search to only fiction books to avoid fetching of non relevant documents (i have defined non fiction keywords in openlib file)
also the UI followed is very basic.

## Tech Stack
- React Native
- Expo
- TypeScript
- Open Library API
- google books api

## Features
- book search by name and author 
- book details with cover images
- Ratings display (where API data is available)
- can also mark books as read and unread


## APIs Used
### Open Library API
used to fetch book information such as book name, authors, year of publish, and cover image.
## google books api
used to fetch and display description, ratings and reviews

## Error Handling
- error to try again if api requests fails

## Testing
Basic unit tests for critical UI components.

## pre requisites
- Node.js pkgs installed (npm install, also install relevant react native libs)
- Expo CLI install
- Android Studio for emulator OR Expo Go app on a physical device
- to run project make sure android emulator is running
- run this command after cloning repo from github
- npx expo start and then 'a' to run app on android

## project struct

src/
app/
   app.tsx
   index.ts
comp/
    bookcard.tsx
screens/
    book_details.tsx
    search.tsx
services/
    googlebooks.ts
    openlib.ts
types/
    Book.ts


## Test cases

1. Search "Harry potter"
2. incomplete query search 
3. check book details page
4. turn off internet
5. search for a non existing title
