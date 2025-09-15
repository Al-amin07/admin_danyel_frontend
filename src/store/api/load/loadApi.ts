import { baseApi } from "../baseApi";

const loadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLoads: builder.query({
      query: (data = {}) => {
        const { limit = 10, page = 1, search = "" } = data;
        const params: Record<string, any> = {};
        if (limit) params.limit = limit;
        if (page) params.page = page;
        if (search) params.search = search;

        return {
          url: "/load",
          params,
          method: "GET",
        };
      },
    }),
    getMyLoads: builder.query({
      query: (data = {}) => {
        const { limit = 10, page = 1, search = "", loadStatus = "" } = data;
        const params: Record<string, any> = {};
        if (limit) params.limit = limit;
        if (page) params.page = page;
        if (search) params.search = search;
        if (loadStatus) params.loadStatus = loadStatus;

        return {
          url: "/company/myload",
          params,
          method: "GET",
        };
      },
      providesTags: ["COMPANY_LOADS"],
    }),
    getMyStat: builder.query({
      query: () => {
        return {
          url: "/company/mystat",
          method: "GET",
        };
      },
    }),
    getSingleLoad: builder.query({
      query: (id) => ({
        url: `/load/${id}`,
        method: "GET",
      }),
      // providesTags: (result, error, id) => [{ type: "Load", id }],
    }),
    createLoad: builder.mutation({
      query: (data) => ({
        url: "/load/create-load",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["COMPANY_LOADS"],
    }),
    updateLoad: builder.mutation({
      query: ({ id, data }) => ({
        url: `/load/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["COMPANY_LOADS"],
    }),
    changeDriver: builder.mutation({
      query: ({ id, data }) => ({
        url: `/load/${id}/change-driver`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["COMPANY_LOADS"],
    }),
    assignLoadToDriver: builder.mutation({
      query: ({ id, data }) => ({
        url: `/load/${id}/assign-driver`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["COMPANY_LOADS"],
    }),
  }),
});

export const {
  useGetAllLoadsQuery,
  useGetMyLoadsQuery,
  useGetSingleLoadQuery,
  useCreateLoadMutation,
  useGetMyStatQuery,
  useUpdateLoadMutation,
  useChangeDriverMutation,
  useAssignLoadToDriverMutation,
} = loadApi;
