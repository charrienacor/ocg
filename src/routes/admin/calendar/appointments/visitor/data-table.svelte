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
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import { Input } from "$lib/components/ui/input";
  import Actions from "./data-table-actions.svelte";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import CalendarIcon from "svelte-radix/Calendar.svelte";

  import * as Select from "$lib/components/ui/select/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  $: selectedDate = today(getLocalTimeZone());
  export let v_appointments: any;
  export let counselors: any;

  const table = createTable(readable(v_appointments), {
    sort: addSortBy({ disableMultiSort: true }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    select: addSelectedRows(),
    hide: addHiddenColumns(),
  });

  const columns = table.createColumns([
    table.column({
      header: "Name",
      accessor: "Visitor_Name",
      plugins: {
        sort: {
          disable: true,
        },
      },
    }),
    table.column({
      header: "Counselor",
      accessor: ({ Counselor }) => Counselor,
      cell: ({ value }) => {
        let counselor = counselors.filter((v) => v._id === value);
        let counselorName = "";
        if (Object.entries(counselor) != 0) {
          counselorName = `${counselor[0].First_Name} ${counselor[0].Middle_Name} ${counselor[0].Last_Name}`;
        }
        return counselorName;
      },
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      header: "Date",
      accessor: "Appointment_Date",
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      header: "Time",
      accessor: "Appointment_Time",
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      header: "Nature of Concern",
      accessor: "Nature_Of_Concern",
      plugins: {
        sort: {
          disable: true,
        },
      },
    }),
    table.column({
      header: "Status",
      accessor: "Status",
      plugins: {
        sort: {
          disable: false,
        },
      },
    }),
    table.column({
      accessor: ({ _id }) => _id,
      header: "Actions",
      cell: ({ value }) => {
        return createRender(Actions, { _id: value });
      },
      plugins: {
        sort: {
          disable: true,
        },
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);

  const { sortKeys } = pluginStates.sort;
  const { selectedDataIds } = pluginStates.select;
  const { filterValue } = pluginStates.filter;
  const statuses = [
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Pending", label: "Pending" },
  ];

  $: selectedCounselor = ""
    ? {
        label: "",
        value: "",
      }
    : undefined;

  $: selectedStatus = ""
    ? {
        label: "",
        value: "",
      }
    : undefined;
</script>

<div class="w-full">
  <div class="flex items-center gap-1 py-4">
    <Input
      class="max-w-sm"
      placeholder="Search"
      type="text"
      bind:value={$filterValue}
    />
    <Select.Root
      selected={selectedCounselor}
      onSelectedChange={(v) => {
        v && ($filterValue = v.value.toString());
      }}
    >
      <Select.Trigger class="w-[250px]">
        <Select.Value placeholder="Select a Guidance Counselor" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each counselors as counselor}
            <Select.Item
              value={counselor._id}
              label="{counselor.First_Name} {counselor.Last_Name}"
              >{counselor.First_Name} {counselor.Last_Name}</Select.Item
            >
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>

    <Select.Root
      selected={selectedStatus}
      onSelectedChange={(v) => {
        v && ($filterValue = v.value.toString());
      }}
    >
      <Select.Trigger class="w-[150px]">
        <Select.Value placeholder="Status" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each statuses as status}
            <Select.Item value={status.value} label={status.label}
              >{status.label}</Select.Item
            >
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>
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
              $filterValue = v.toString();
            } else {
              console.log(v);
            }
          }}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  <div class="w-full rounded-md border">
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
                    {#if cell.id === "amount"}
                      <div class="text-right font-medium">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "Counselor" || cell.id === "Appointment_Date" || cell.id === "Appointment_Time" || cell.id === "Status"}
                      <div
                        class="flex flex-row content-center items-center justify-center gap-1 align-middle"
                      >
                        <div>
                          <Render of={cell.render()} />
                        </div>
                        <Button
                          variant="ghost"
                          class="m-0 p-0"
                          on:click={props.sort.toggle}
                        >
                          <ArrowUpDown class="m-0 h-5 w-5 p-0" />
                        </Button>
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
