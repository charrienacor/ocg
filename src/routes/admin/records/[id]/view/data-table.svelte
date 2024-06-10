<script lang="ts">
    import {
      Render,
      Subscribe,
      createTable, 
      createRender,
    } from "svelte-headless-table";
    import {
      addHiddenColumns,
      addSelectedRows,
      addSortBy,
      addTableFilter
    } from "svelte-headless-table/plugins";
    import { readable } from "svelte/store";
    import DataTableActions from "./data-table-actions.svelte";
    import * as Table from "$lib/components/ui/table/index.js";
    import { cn } from "$lib/utils.js";
    import {
        DateFormatter,
        type DateValue,
    } from "@internationalized/date";
    
    const df = new DateFormatter("en-US", {
        dateStyle: "long"
    });
    
    let value: DateValue | undefined = undefined;
   
    type Payment = {
      id: string;
      date: any;
      time: any;
      nature: string;
      status: "Accepted" | "Rejected" | "Pending";
    };
   
    const data: Payment[] = [
      {
        id: "wqerq234r",
        date: "April 25, 2024",
        time: "10:30 AM",
        nature: "Academic Stress",
        status: "Accepted"
      },
      {
        id: "345hge",
        date: "April 26, 2024",
        time: "2:30 PM",
        nature: "Heartbroken",
        status: "Rejected"
      },
      {
        id: "tr32t34fr",
        date: "April 27, 2024",
        time: "1:30 PM",
        nature: "Ghosted",
        status: "Rejected"
      },
      {
        id: "tq34frw34",
        date: "April 28, 2024",
        time: "10:30 AM",
        nature: "Family Pressure",
        status: "Accepted"
      },
      {
        id: "t314rf3",
        date: "April 29, 2024",
        time: "8:30 AM",
        nature: "Career Stress",
        status: "Accepted"
      }
    ];
   
    const table = createTable(readable(data), {
      sort: addSortBy({ disableMultiSort: true }),
      filter: addTableFilter({
        fn: ({ filterValue, value }) => value.includes(filterValue)
      }),
      select: addSelectedRows(),
      hide: addHiddenColumns()
    });
   
    const columns = table.createColumns([
      table.column({
        header: "Appointment ID",
        accessor: "id",
        plugins: { sort: { disable: true }, filter: { exclude: true } }
      }),
      table.column({
        header: "Date",
        accessor: "date",
        cell: ({ value }) => value,
        plugins: {
          filter: {
            getFilterValue(value) {
              return value;
            }
          }
        }
      }),
      table.column({
        header: "Time",
        accessor: "time",
        plugins: { sort: { disable: true }, filter: { exclude: true } }
      }),
      table.column({
        header: "Nature of Concern",
        accessor: "nature",
        plugins: { sort: { disable: true }, filter: { exclude: true } }
      }),
      table.column({
        accessor: ({ id }) => id,
        header: "Remarks",
        cell: ({ value }) => {
          return createRender(DataTableActions, { id: value });
        },
      }),
    ]);
   
    const {
      headerRows,
      pageRows,
      tableAttrs,
      tableBodyAttrs,
      flatColumns,
      pluginStates,
    } = table.createViewModel(columns);
   
    const { sortKeys } = pluginStates.sort;
   
    const ids = flatColumns.map((c) => c.id);
   
    const { selectedDataIds } = pluginStates.select;

  </script>
   
  <div class="w-full">
    <div class="rounded-md border">
      <Table.Root {...$tableAttrs}>
        <Table.Header>
          {#each $headerRows as headerRow}
            <Subscribe rowAttrs={headerRow.attrs()}>
              <Table.Row>
                {#each headerRow.cells as cell (cell.id)}
                  <Subscribe
                    attrs={cell.attrs()}
                    let:attrs
                    props={cell.props()}
                    let:props
                  >
                    <Table.Head
                      {...attrs}
                      class={cn("[&:has([role=checkbox])]:pl-3")}
                    >
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
              <Table.Row
                {...rowAttrs}
                data-state={$selectedDataIds[row.id] && "selected"}
              >
                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    <Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
                      {#if cell.id === "amount"}
                        <div class="text-right font-medium">
                          <Render of={cell.render()} />
                        </div>
                      {:else if cell.id === "status"}
                        <div class="capitalize">
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
</div>