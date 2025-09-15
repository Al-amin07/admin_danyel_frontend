import { baseApi } from "../baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendNotificatioToSuggestedDriver: builder.mutation({
      query: (data) => {
        return {
          url: `/company/send-load-notification`,

          method: "POST",
          body: data,
        };
      },
    }),
    myEarn: builder.query({
      query: () => {
        return {
          url: `/company/my-earn`,

          method: "GET",
        };
      },
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: `/users/get-profile`,

          method: "GET",
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/change-password`,

          method: "POST",
          body: data,
        };
      },
    }),
    updateComapnyDetails: builder.mutation({
      query: (data) => {
        return {
          url: `/company`,

          method: "PATCH",
          body: data,
        };
      },
    }),
    getAllCompanies: builder.query({
      query: (data) => {
        const { limit = 10, page = 1, search = "" } = data;
        const params: Record<string, any> = {};
        if (limit) params.limit = limit;
        if (page) params.page = page;
        if (search) params.search = search;
        return {
          url: `/company`,
          params,
          method: "GET",
        };
      },
    }),
    getSingleCompany: builder.query({
      query: (data) => {
        return {
          url: `/company/${data?.id}`,

          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetMyProfileQuery,

  useGetAllCompaniesQuery,
  useGetSingleCompanyQuery,
} = companyApi;
