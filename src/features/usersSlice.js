import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

//-----------------------------
//           Users
//-----------------------------
//save username and user pfp 
export const saveUser = createAsyncThunk(
    'users/saveUser',
    async ({ userId, username}) => {
        try {

            const usersRef = collection(db, `users/${userId}/profile`);
            const newUserRef = doc(usersRef);
            await setDoc(newUserRef, { username});
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

//fetch user
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async ({ userId }) => {
        try {
            const userRef = collection(db, `users/${userId}/profile`);
            const user = await getDocs(userRef);

            const docs = user.docs.map((profile) => ({
                id: profile.id,
                ...profile.data(),
            }))
            
            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

//-----------------------------
//           Games
//-----------------------------

//save game name and image url (info)
export const saveGame = createAsyncThunk(
    'games/saveGame',
    async ({ userId, file, name }) => {
        let imageUrl = "";
        console.log(userId, file, name)
        const imageRef = ref(storage, `games/${file.name}`);
        const response = await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(response.ref);
        console.log(imageUrl)

        const gamesRef = collection(db, `users/${userId}/games`);
        const newGameRef = doc(gamesRef);
        await setDoc(newGameRef, { name, imageUrl });
        const newDoc = await getDoc(newGameRef);
        console.log(newDoc);

        const game = {
            id: newDoc.id,
            ...newDoc.data()
        }
        return game;
    }
)

//fetch all game profile images
export const fetchImage = createAsyncThunk(
    'games/fetchImages',
    async ({ userId }) => {
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
            //delete characters folder
            const charRef = collection(db, `users/${userId}/games/${imageId}/characters`);
            const snapshot = await getDocs(charRef);
            for (const char of snapshot.docs) {
                await deleteDoc(char.ref);
            }

            const gameRef = doc(db, `users/${userId}/games/${imageId}`);
            await deleteDoc(gameRef);
            return name;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

//fetch game profile image
export const fetchGame = createAsyncThunk(
    'games/fetchGame',
    async ({ userId, gameId }) => {
        try {
            const imageRef = doc(db, `users/${userId}/games/${gameId}`);
            const image = await getDoc(imageRef);
            const docs = {
                id: image.id,
                ...image.data()
            }

            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

//-----------------------------
//         Characters
//-----------------------------

export const saveCharacter = createAsyncThunk(
    'characters/saveCharacter',
    async ({ userId, gameId, name, file, cgs }) => {
        console.log(userId, gameId, name, file, cgs);
        //upload pfp to firestorage
        let imageUrl = "";
        const pfpRef = ref(storage, `characters/${Date.now()}_${file.name}`);
        const response = await uploadBytes(pfpRef, file);
        imageUrl = await getDownloadURL(response.ref);
        console.log(imageUrl)

        //upload cgs to firestore
        const urls = [];
        for (const cg of cgs) {
            const cgsRef = ref(storage, `cgs/${Date.now()}_${cg.name}`);
            const result = await uploadBytes(cgsRef, cg);
            let imgUrl = await getDownloadURL(result.ref);
            urls.push(imgUrl);
        }
        console.log(urls);

        //upload pfp to firebase db
        console.log(userId, gameId);
        const gamesRef = collection(db, `users/${userId}/games/${gameId}/characters`);
        const newCharRef = doc(gamesRef);
        await setDoc(newCharRef, { name, imageUrl });
        const newChar = await getDoc(newCharRef);
        console.log('hello');

        const char = {
            id: newChar.id,
            ...newChar.data(),
        }

        //upload cg to firebase db
        const charactersRef = collection(db, `users/${userId}/games/${gameId}/characters/${char.id}/cgs`);
        const newCgRef = doc(charactersRef);
        await setDoc(newCgRef, { urls });

        return char;
    }
)

export const fetchCharProfile = createAsyncThunk(
    'characters/fetchImage',
    async ({ userId, gameId }) => {
        try {
            const charRef = collection(db, `users/${userId}/games/${gameId}/characters`);
            const querySnapshot = await getDocs(charRef);
            const docs = querySnapshot.docs.map((char) => ({
                id: char.id,
                ...char.data(),
            }))
            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const fetchCharImage = createAsyncThunk(
    'characters/fetchChar',
    async ({ userId, gameId, charId }) => {
        try {
            const charRef = doc(db, `users/${userId}/games/${gameId}/characters/${charId}`);
            const char = await getDoc(charRef);
            const docs = {
                id: char.id,
                ...char.data()
            }
            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const fetchCgs = createAsyncThunk(
    'characters/fetchCgs',
    async ({ userId, gameId, charId }) => {
        try {
            const cgRef = collection(db, `users/${userId}/games/${gameId}/characters/${charId}/cgs`);
            const cg = await getDocs(cgRef);
            const docs = cg.docs.map((img) => ({
                id: img.id,
                ...img.data()
            }))
            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const deleteCharacter = createAsyncThunk(
    'characters/deleteCharacter',
    async ({ userId, gameId, charId }) => {
        try {
            const charRef = doc(db, `users/${userId}/games/${gameId}/characters/${charId}`);
            await deleteDoc(charRef);
            const cgRef = collection(db, `users/${userId}/games/${gameId}/characters/${charId}/cgs`);
            const snapshot = await getDocs(cgRef);
            await deleteDoc(snapshot.docs[0].ref);
            return name;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [], games: [], game: [], images: [], characters: [], character: [], cgs: [] },
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(saveGame.fulfilled, (state, action) => {
                state.games.push(action.payload);
            })
            .addCase(fetchImage.fulfilled, (state, action) => {
                state.images = action.payload;
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                const deletedGame = action.payload
                state.games = state.games.filter((game) => game.name !== deletedGame);
            })
            .addCase(saveCharacter.fulfilled, (state, action) => {
                state.characters.push(action.payload);
            })
            .addCase(fetchCharProfile.fulfilled, (state, action) => {
                state.characters = action.payload;
            })
            .addCase(deleteCharacter.fulfilled, (state, action) => {
                const deletedChar = action.payload;
                state.characters = state.characters.filter((char) => char.name !== deletedChar);
            })
            .addCase(fetchGame.fulfilled, (state, action) => {
                state.game = action.payload;
            })
            .addCase(fetchCharImage.fulfilled, (state, action) => {
                state.character = action.payload;
            })
            .addCase(fetchCgs.fulfilled, (state, action) => {
                state.cgs = action.payload;
            })
    }
})

export default usersSlice.reducer;