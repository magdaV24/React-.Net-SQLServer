import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../utils/host";
import {
  ADD_CARD,
  FETCH_GAME_CATEGORIES,
  FETCH_CARDS_PUBLIC_CATEGORIES,
  CARD,
  DELETE_CARD,
  FETCH_USER_CARDS,
  EDIT_PUBLIC,
  EDIT_FIELD,
  LOGIN,
  REGISTER,
  CHANGE_PHOTO,
  ADD_PHOTO,
  DELETE_PHOTO,
} from "../../utils/urls";
import { EditPublic } from "../../types/EditPublicType";
import { EditField } from "../../types/EditFieldType";
import { User } from "../../types/UserType";
import { RegisterDTO } from "../../types/RegisterDTO";
import { LoginDTO } from "../../types/LoginDTO";
import store from "../store";
import { ChangePhoto } from "../../types/ChangePhotoType";
import { AddPhoto } from "../../types/AddPhotoType";
import { DeletePhoto } from "../../types/DeletePhotoType";

type Input = {
  category: string;
  limit: number;
};

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: host,
    prepareHeaders: (headers) => {
      const token = store.getState().userReducer.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Cards", "Card"],
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginDTO>({
      query(input) {
        return {
          url: LOGIN,
          method: "POST",
          body: input,
        };
      },
    }),
    register: builder.mutation<User, RegisterDTO>({
      query(input) {
        return {
          url: REGISTER,
          method: "POST",
          body: input,
        };
      },
    }),
    addCard: builder.mutation({
      query(input) {
        return {
          url: ADD_CARD,
          method: "POST",
          body: input,
        };
      },
    }),
    fetchCard: builder.query({
      query(id: number) {
        return {
          url: `${CARD}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Card"],
    }),
    fetchCardsPublicCategories: builder.query({
      query: () => {
        return {
          url: FETCH_CARDS_PUBLIC_CATEGORIES,
          method: "GET",
        };
      },
      providesTags: ["Cards"],
    }),
    fetchGameCategories: builder.query({
      query: (id: string) => {
        return {
          url: `${FETCH_GAME_CATEGORIES}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Cards"],
    }),
    fetchGameCards: builder.query({
      query: (input: Input) => {
        return {
          url: `${CARD}/${input.category}/${input.limit}`,
          method: "GET",
        };
      },
      providesTags: ["Cards"],
    }),
    editField: builder.mutation({
      query: (card: EditField) => {
        return {
          url: EDIT_FIELD,
          method: "PUT",
          body: card,
        };
      },
    }),
    changePhoto: builder.mutation({
      query: (input: ChangePhoto) => {
        return{
          url: CHANGE_PHOTO,
          method: "PUT",
          body: input
        }
      }
    }),
    addPhoto: builder.mutation({
      query: (input: AddPhoto)=>{
        return{
          url: ADD_PHOTO,
          method: "PUT",
          body: input
        }
      }
    }),
    deletePhoto: builder.mutation({
      query: (input: DeletePhoto)=>{
        return{
          url: DELETE_PHOTO,
          method: "PUT",
          body: input
        }
      }
    }),
    editPublic: builder.mutation({
      query: (card: EditPublic) => {
        return {
          url: EDIT_PUBLIC,
          method: "PUT",
          body: card,
        };
      },
    }),
    deleteCard: builder.mutation({
      query: (id: number) => {
        return {
          url: `${DELETE_CARD}/${id}`,
          method: "DELETE",
        };
      },
    }),
    fetchUserCards: builder.query({
      query: (id: string | undefined) => {
        return {
          url: `${FETCH_USER_CARDS}/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddCardMutation,
  useFetchCardsPublicCategoriesQuery,
  useFetchGameCategoriesQuery,
  useFetchCardQuery,
  useFetchGameCardsQuery,
  useEditFieldMutation,
  useEditPublicMutation,
  useDeleteCardMutation,
  useFetchUserCardsQuery,
  useChangePhotoMutation,
  useAddPhotoMutation,
  useDeletePhotoMutation
} = appApi;
