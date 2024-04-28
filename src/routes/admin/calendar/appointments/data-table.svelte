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
  import DataTableActions from "./data-table-actions.svelte";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import Check from "lucide-svelte/icons/check";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { cn } from "$lib/utils.js";
  import { tick } from "svelte";

  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  export let appointments: any;
  // export let v_appointments: any;

  let value: DateValue | undefined = undefined;

  type Payment = {
    name: string;
    date: any;
    time: any;
    nature: string;
    status: "Accepted" | "Rejected" | "Pending";
  };

  const data: Payment[] = [
    {
      name: "Kim Sunoo",
      date: "April 25, 2024",
      time: "10:30 AM",
      nature: "Academic Stress",
      status: "Accepted",
    },
    {
      name: "Park Jongseong",
      date: "April 26, 2024",
      time: "2:30 PM",
      nature: "Heartbroken",
      status: "Rejected",
    },
    {
      name: "Lee Heeseung",
      date: "April 27, 2024",
      time: "1:30 PM",
      nature: "Ghosted",
      status: "Rejected",
    },
    {
      name: "Nishimura Riki",
      date: "April 28, 2024",
      time: "10:30 AM",
      nature: "Family Pressure",
      status: "Accepted",
    },
    {
      name: "Yang Jungwon",
      date: "April 29, 2024",
      time: "8:30 AM",
      nature: "Career Stress",
      status: "Accepted",
    },
  ];

  const table = createTable(readable(appointments), {
    sort: addSortBy({ disableMultiSort: true }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.includes(filterValue),
    }),
    select: addSelectedRows(),
    hide: addHiddenColumns(),
  });

  const columns = table.createColumns([
    table.column({
      header: "Name",
      accessor: "Student_Name",
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    table.column({
      header: "Date",
      accessor: "Appointment_Date",
      cell: ({ value }) => value,
      plugins: {
        filter: {
          getFilterValue(value) {
            return value;
          },
        },
      },
    }),
    table.column({
      header: "Time",
      accessor: "Appointment_Time",
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    table.column({
      header: "Nature of Concern",
      accessor: "Nature_Of_Concern",
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    // table.column({
    //   accessor: ({ id }) => id,
    //   header: "Status",
    //   cell: ({ value }) => {
    //     return createRender(DataTableActions, { id: value });
    //   },
    // }),
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

  const { hiddenColumnIds } = pluginStates.hide;
  const ids = flatColumns.map((c) => c.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const { selectedDataIds } = pluginStates.select;

  const frameworks = [
    {
      user: "student",
      label: "Student",
    },
    {
      user: "visitor",
      label: "Visitor",
    },
  ];

  let open = false;
  let user = "";

  $: selectedValue = frameworks.find((f) => f.user === user)?.label ?? "User";

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<div class="w-full">
  <div class="flex items-center py-4">
    <Popover.Root>
      <Popover.Trigger asChild let:builder>
        <Button
          variant="outline"
          class={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          builders={[builder]}
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0">
        <Calendar bind:value initialFocus />
      </Popover.Content>
    </Popover.Root>

    <Popover.Root bind:open let:ids>
      <Popover.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          class="ml-auto w-[150px] justify-between"
        >
          {selectedValue}
          <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-[150px] p-0">
        <Command.Root>
          <Command.Group>
            {#each frameworks as framework}
              <Command.Item
                user={framework.user}
                onSelect={(currentUser) => {
                  user = currentUser;
                  closeAndFocusTrigger(ids.trigger);
                }}
              >
                <Check
                  class={cn(
                    "mr-2 h-4 w-4",
                    user !== framework.user && "text-transparent",
                  )}
                />
                {framework.label}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.Root>
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
                    {#if cell.id === "amount"}
                      <div class="text-right font-medium">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "email"}
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

