// "axios" package needs to be installed
import { AxiosInstance } from "axios";
// "stringify" function is re-exported from "query-string" package by "@refinedev/simple-rest"
import { stringify } from "@refinedev/simple-rest";
import { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "./utils";

export const dataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance
): Omit<
    Required<DataProvider>,
    "createMany" | "updateMany" | "deleteMany"
    > => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    const url = `${apiUrl}/${resource}`;
    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};
    const queryFilters = generateFilter(filters);
    const query: {
      page?: number;
      size?: number;
      order_by?: string;
      //_start?: number;
      //_end?: number;
      // _sort?: string;
      // _order?: string;
    } = {};
    if (mode === "server") {
      query.page= current;
      query.size= pageSize;
      // query._start = (current - 1) * pageSize;
      // query._end = current * pageSize;
    }
    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      // query._sort = _sort.join(",");
      // query._order = _order.join(",");
      query.order_by = `${_order}${_sort}`;
    }
    //const { data, headers } = await httpClient.get(
      const { data } = await httpClient.get(
        `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );
    //const total = +headers["x-total-count"];
    return {
      data: data.items,
      total: data.total,
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
        `${apiUrl}/${resource}?${stringify({ id: ids })}`
    );
    return {
      data: data.items,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await httpClient.post(url, variables);
    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient.put(url, variables);
    return {
      data,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient.get(url);
    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient.delete(url, {
      data: variables,
    });
    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
                   url,
                   method,
                   filters,
                   sorters,
                   payload,
                   query,
                   headers,
                 }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    if (headers) {
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headers,
      };
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload);
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }
    const { data } = axiosResponse;
    return Promise.resolve({ data });
  },
});
