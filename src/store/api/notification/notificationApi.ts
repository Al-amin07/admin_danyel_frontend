import { baseApi } from "../baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyNotification: builder.query({
      query: (data) => {
        return {
          url: `/notification/${data?.id}`,

          method: "GET",
        };
      },
      providesTags: ["NOTIFICATION"],
    }),

    updateNotificationStatus: builder.mutation({
      query: (data) => ({
        url: `/notification/mark-as-read`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),
  }),
});

export const {
  useGetAllMyNotificationQuery,
  useUpdateNotificationStatusMutation,
} = notificationApi;
