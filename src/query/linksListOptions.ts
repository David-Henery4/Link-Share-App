import { queryOptions } from "@tanstack/react-query";
import { db } from "@/db";
import { linksTable } from "@/db/schemas/linksSchema";

const listOptions = queryOptions({
  queryKey: ["links-list"],
  queryFn: async () => {
    const res = await db.select().from(linksTable);
    return res;
  },
});

export default listOptions;
