import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

//save username and user pfp 
export const saveUser = createAsyncThunk(
    'users/saveUser',
    async ({ userId, username, file }) => {
        try {
            let imageUrl = "";
            const imageRef = ref(storage, `users/${file}`);
            const response = await uploadBytes(imageRef, file);
            imageUrl = await getDownloadURL(response.ref);

            const usersRef = collection(db, `users/${userId}/profile`);
            const newUserRef = doc(usersRef);
            await setDoc(newUserRef, { username, imageUrl });
            const newDoc = await getDoc(newUserRef);

            const user = {
                id: newDoc.id,
                ...newDoc.data(),
            }
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

//save game name and image url 
export const saveGame = createAsyncThunk(
    'games/saveGame',
    async ({ userId, file, name }) => {
        let imageUrl = "";
        const imageRef = ref(storage, `games/${file.name}`);
        const response = await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(response.ref);

        const gamesRef = collection(db, `users/${userId}/games`);
        const newGameRef = doc(gamesRef);
        await setDoc(newGameRef, { name, imageUrl });
        const newDoc = await getDoc(newGameRef);

        const game = {
            id: newDoc.id,
            ...newDoc.data()
        }
        return game;
    }
)

//fetch game profile image
export const fetchImage = createAsyncThunk(
    'games/fetchImages',
    async ({ userId}) => {
        try {
            const imageRef = collection(db, `users/${userId}/games`);
            const querySnapshot = await getDocs(imageRef);
            const docs = querySnapshot.docs.map((image) => ({
                id: image.id,
                ...image.data(),
            }))
            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

//delete game profile image
export const deleteGame = createAsyncThunk(
    'games/deleteGame',
    async ({ userId, imageId }) => {
        try {
            const gameRef = doc(db, `users/${userId}/games/${imageId}`);
            await deleteDoc(gameRef);
            return name;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)



const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [], games: [], images: [] },
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(saveGame.fulfilled, (state, action) => {
                state.games = action.payload;
            })
            .addCase(fetchImage.fulfilled, (state, action) => {
                state.images = action.payload;
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                const deletedGame = action.payload
                state.games = state.games.filter((game) => game.name !== deletedGame);
            })
    }
})

export default usersSlice.reducer;