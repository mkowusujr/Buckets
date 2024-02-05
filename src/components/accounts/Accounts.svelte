<script lang="ts">
  import AccountCard from "./AccountCard.svelte";
  import type { Account } from "@prisma/client";
  export let accounts: Account[];
</script>

<ul class="flex gap-8">
  {#each accounts as account}
    <li>
      <AccountCard {account} />
    </li>
  {/each}
</ul>
