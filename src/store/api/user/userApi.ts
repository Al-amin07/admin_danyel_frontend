import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (data) => {
        const { limit = 10, page = 1, search = "" } = data;
        const params: Record<string, any> = {};
        if (limit) params.limit = limit;
        if (page) params.page = page;
        if (search) params.search = search;
        return {
          url: `/users/getAllUser`,
          params,
          method: "GET",
        };
      },
      providesTags: ["USER"],
    }),
    getSingleCompany: builder.query({
      query: (data) => {
        return {
          url: `/company/${data?.id}`,

          method: "GET",
        };
      },
    }),
    blockUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/block-user/${data?.id}`,
          body: { isBlocked: data?.isBlocked },
          method: "PATCH",
        };
      },
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/delete-user/${data?.id}`,
          body: { isDeleted: data?.isDeleted },
          method: "DELETE",
        };
      },
      invalidatesTags: ["USER"],
    }),
    getAdminState: builder.query({
      query: () => {
        return {
          url: `/admin/admin-stat`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleCompanyQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAdminStateQuery,
} = userApi;
