import { baseApi } from "../baseApi";

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
      query: (data = {}) => {
        const {
          limit = 10,
          page = 1,
          search = "",
          status = "All",
          vehicleType = "All",
          availability = "All",
        } = data;
        const params: Record<string, any> = {};
        if (limit) params.limit = limit;

        params.status = status;
        params.vehicleType = vehicleType;
        params.availability = availability;

        if (page) params.page = page;
        if (search) params.search = search;

        return {
          url: "/driver",
          params,
          method: "GET",
        };
      },
    }),
    getSingleDriver: builder.query({
      query: (id: string) => {
        return {
          url: `/driver/getdriver/${id}`,

          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllDriversQuery, useGetSingleDriverQuery } = driverApi;
