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
    addTableFilter,
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { Input } from "$lib/components/ui/input";
  import Actions from "./data-table-actions.svelte";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
    today,
  } from "@internationalized/date";

  export let appointments: any;

  $: selectedDate = today(getLocalTimeZone());
  let filterDate = "";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  const table = createTable(readable(appointments), {
    sort: addSortBy({ disableMultiSort: false }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()) ||
        value.includes(filterDate),
    }),
    select: addSelectedRows(),
    hide: addHiddenColumns(),
  });

  const columns = table.createColumns([
    table.column({
      header: "Name",
      accessor: "Student_Name",
    }),
    table.column({
      header: "Date",
      accessor: "Appointment_Date",
    }),
    table.column({
      header: "Time",
      accessor: "Appointment_Time",
    }),
    table.column({
      header: "Nature of Concern",
      accessor: "Nature_Of_Concern",
    }),
    table.column({
      header: "Status",
      accessor: "Status",
    }),
    table.column({
      accessor: ({ _id }) => _id,
      header: "Actions",
      cell: ({ value }) => {
        return createRender(Actions, { _id: value });
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
  const { selectedDataIds } = pluginStates.select;
  const { filterValue } = pluginStates.filter;
</script>

<div class="w-full">
  <div class="flex flex-row justify-between py-4">
    <Input
      class="max-w-sm"
      placeholder="Search"
      type="text"
      bind:value={$filterValue}
    />
    <Popover.Root>
      <Popover.Trigger
        class={cn(
          buttonVariants({ variant: "outline" }),
          "w-[180px] justify-start pl-4 text-left font-normal",
          !selectedDate && "text-muted-foreground",
        )}
      >
        {selectedDate
          ? df.format(selectedDate.toDate(getLocalTimeZone()))
          : "Pick a date"}
        <CalendarIcon class="ml-auto h-4 w-4 opacity-50 " />
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0" side="top">
        <Calendar
          onValueChange={(v) => {
            if (v) {
              selectedDate = v;
              filterDate = v.toString();
              // filterAppointments = appointments.filter(
              //   (e) => e.Appointment_Date === filterDate,
              // );
            } else {
              console.log(v);
            }
          }}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
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
                    {#if cell.id === "Action"}
                      <div class="text-center">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "Date"}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                        <Render of={cell.render()} />
                        <ArrowUpDown
                          class={cn(
                            $sortKeys[0]?.id === cell.id && "text-foreground",
                            "ml-2 h-4 w-4",
                          )}
                        />
                      </Button>
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
            <Table.Row
              {...rowAttrs}
              data-state={$selectedDataIds[row.id] && "selected"}
            >
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
                    {#if cell.id === "Actions"}
                      <div class="justify-between">
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
