<script lang="ts">
  import { createTable, Render, Subscribe, createRender, } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { page } from "$app/stores";
 
  type Payment = {
    id: number;
    first_name: string;
    year: string;
    course: string;
  };
 
  const data: Payment[] = $page.data.students;
 
  const table = createTable(readable(data));
 
  const columns = table.createColumns([
    table.column({
      accessor: "_id",
      header: "ID",
    }),
    table.column({
      accessor: "Student_Name",
      header: "Full Name",
    }),
    table.column({
      accessor: "School_Year",
      header: "Year",
    }),
    table.column({
      accessor: "Course",
      header: "Course",
    }),
    table.column({
      accessor: ({ _id }) => _id,
      header: "Functions",
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