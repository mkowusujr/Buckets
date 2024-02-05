<script lang="ts">
  export let data;
  $: ({ account, accounts } = data);
</script>

<main>
  {#if !data}
    <p>Loading...</p>
  {/if}
  {#if account}
    <p>Account id = {account.id}</p>
    <p>Account name = {account.name}</p>
  {/if}
  {#if accounts}
    <ul>
      {#each accounts as acct}
        <li>
          <a href={`/accounts?id=${acct.id}`}>{acct.name}</a>
        </li>
      {/each}
    </ul>
  {/if}
</main>
