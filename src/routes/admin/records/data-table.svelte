<script lang="ts">
    import { createTable, Render, Subscribe, createRender, } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./data-table-actions.svelte";
   
    type Payment = {
      id: number;
      first_name: string;
      middle_name: string;
      last_name: string;
      year: string;
      course: string;
    };
   
    const data: Payment[] = [
      {
        id: 202110000,
        first_name: "Lester",
        middle_name: "N/A",
        last_name: "Ignacio",
        year: "Third Year",
        course: "BS Computer Science",
      },
      {
        id: 202110001,
        first_name: "Charrie Anne",
        middle_name: "S.",
        last_name: "Nacor",
        year: "Third Year",
        course: "BS Computer Science",
      },
      {
        id: 202110002,
        first_name: "Alyanna May",
        middle_name: "M.",
        last_name: "Lopez",
        year: "Third Year",
        course: "BS Computer Science",
      },
      {
        id: 202110003,
        first_name: "Gideon Daniel",
        middle_name: "T.",
        last_name: "Orseno",
        year: "Third Year",
        course: "BS Computer Science",
      },
      {
        id: 202110004,
        first_name: "John Kenneth",
        middle_name: "E.",
        last_name: "Herrera",
        year: "Third Year",
        course: "BS Computer Science",
      },
    ];
   
    const table = createTable(readable(data));
   
    const columns = table.createColumns([
      table.column({
        accessor: "id",
        header: "ID",
      }),
      table.column({
        accessor: "first_name",
        header: "First Name",
      }),
      table.column({
        accessor: "middle_name",
        header: "Middle Name",
      }),
      table.column({
        accessor: "last_name",
        header: "Last Name",
      }),
      table.column({
        accessor: "year",
        header: "Year",
      }),
      table.column({
        accessor: "course",
        header: "Course",
      }),
      table.column({
        accessor: ({ id }) => id,
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