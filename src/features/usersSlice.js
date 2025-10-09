import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, storage } from '../firebase';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

// save user, images to firestore and info to fire db
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

const usersSlice = createSlice({
    name: 'users',
    initialState: { users: [] },
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
    }
})

export default usersSlice.reducer;