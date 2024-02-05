import prisma from "$lib/prisma";
import { error } from "@sveltejs/kit";

export const load = async ({ url }) => {
  const acctId = url.searchParams.get("id");
  if (acctId) {
    try {
      const account = await prisma.account.findFirstOrThrow({
        where: { id: Number(acctId) }
      });
      return { account: account };
    } catch {
      return error(404, {
        message: "Account Not Found"
      });
    }
  } else {
    const accounts = await prisma.account.findMany();
    return { accounts: accounts, acctId: acctId };
  }
};
