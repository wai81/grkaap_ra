import { CrudSorting } from "@pankod/refine-core";

export const generateSort = (sort?: CrudSorting) => {
  if (sort && sort.length > 0) {
    const _sort: string[] = [];
    const _order: string[] = [];

    // eslint-disable-next-line array-callback-return
    sort.map((item) => {
      _sort.push(item.field);
      //_order.push(item.order);
      if (item.order === "asc") {
        _order.push("+");
      }
      if (item.order === "desc") {
        _order.push("-");
      }
    });

    return {
      _sort,
      _order,
    };
  }

  return;
};
