<script lang="ts">
    import { createTable, Render, Subscribe, createRender, } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./data-table-actions.svelte";

    export let counselors: any;
   
    const table = createTable(readable(counselors));
   
    const columns = table.createColumns([
      table.column({
        accessor: "_id",
        header: "ID",
      }),
      table.column({
        accessor: "First_Name",
        header: "First Name",
      }),
      table.column({
        accessor: "Middle_Name",
        header: "Middle Name",
      }),
      table.column({
        accessor: "Last_Name",
        header: "Last Name",
      }),
      table.column({
        accessor: "Suffix",
        header: "Suffix",
      }),
      table.column({
        accessor: "Status",
        header: "Status",
      }),
      table.column({
        accessor: ({ id }) => id,
        header: "Edit",
        cell: ({ value }) => {
          return createRender(DataTableActions, { id: value });
        },
      }),
    ]);
   
    const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
      table.createViewModel(columns);
  </script>
   
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
                    <Render of={cell.render()} />
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
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>