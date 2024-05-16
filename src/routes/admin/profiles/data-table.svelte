<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender,
  } from "svelte-headless-table";
  import { addSortBy, addTableFilter } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { Input } from "$lib/components/ui/input";

  export let counselors: any;

  const table = createTable(readable(counselors), {
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
  });

  const columns = table.createColumns([
    table.column({
      accessor: "_id",
      header: "Email",
      filter: {
        exclude: false,
      },
    }),
    table.column({
      accessor: "First_Name",
      header: "First Name",
      filter: {
        exclude: false,
      },
    }),
    table.column({
      accessor: "Middle_Name",
      header: "Middle Name",
      filter: {
        exclude: false,
      },
    }),
    table.column({
      accessor: "Last_Name",
      header: "Last Name",
      filter: {
        exclude: false,
      },
    }),
    table.column({
      accessor: "RGC",
      header: "",
      cell: ({ value }) => {
        let display = "";
        if (value === "true") {
          display = "RGC";
        }
        return display;
      },
      filter: {
        exclude: false,
      },
    }),
    table.column({
      accessor: "Status",
      header: "Status",
      filter: {
        exclude: false,
      },
    }),
    table.column({
      accessor: ({ _id }) => _id,
      header: "Actions",
      cell: ({ value }) => {
        return createRender(DataTableActions, { _id: value });
      },
      filter: {
        exclude: true,
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  const { filterValue } = pluginStates.filter;
</script>

<div class="h-max">
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Search"
      type="text"
      bind:value={$filterValue}
    />
  </div>
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  {#if cell.id === "Actions"}
                    <div class="text-center">
                      <Render of={cell.render()} />
                    </div>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Header>
    <Table.Body {...$tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  {#if cell.id === "Actions"}
                    <div class="items-center">
                      <Render of={cell.render()} />
                    </div>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
