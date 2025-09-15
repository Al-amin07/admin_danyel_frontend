import { baseApi } from "../baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyConversion: builder.query({
      query: () => {
        return {
          url: "/message/my-message",

          method: "GET",
        };
      },
      providesTags: ["MESSAGE"],
    }),
    getAllInboxMessage: builder.query({
      query: (data: { senderId: string; receiverId: string }) => {
        return {
          url: `message/inbox/${data?.senderId}/${data?.receiverId}`,

          method: "GET",
        };
      },
      providesTags: ["MESSAGE"],
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MESSAGE"],
    }),
    updateMessageStatus: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["MESSAGE"],
    }),
    getDriverInfo: builder.query({
      query: (data) => ({
        url: `/driver/get-driverby-id/${data?.id}`,
        method: "GET",
      }),

      // invalidatesTags: ["MESSAGE"],
    }),
  }),
});

export const {
  useGetAllMyConversionQuery,
  useGetAllInboxMessageQuery,
  useSendMessageMutation,
  useUpdateMessageStatusMutation,
  useGetDriverInfoQuery,
} = messageApi;
