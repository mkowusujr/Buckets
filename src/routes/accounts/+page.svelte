<script lang="ts">
  import Accounts from "../../components/accounts/Accounts.svelte";

  export let data;
  $: ({ account, accounts } = data);
</script>

<main class="flex justify-center">
  {#if !data}
    <p>Loading...</p>
  {/if}
  {#if account}
    <p>Account id = {account.id}</p>
    <p>Account name = {account.name}</p>
  {/if}
  {#if accounts}
    <Accounts {accounts} />
  {/if}
</main>
