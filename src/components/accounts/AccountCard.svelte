<script lang="ts">
  import type { Account } from "@prisma/client";

  export let account: Account;
</script>

<a href={`/accounts?id=${account.id}`}>
  <div
    class="card glass w-96 bg-primary shadow-xl duration-150 hover:-translate-y-2"
  >
    <figure>
      <img src="https://random.imagecdn.app/500/150" alt="" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{account.name}</h2>
      <p>${account.amount}</p>
    </div>
  </div>
</a>
