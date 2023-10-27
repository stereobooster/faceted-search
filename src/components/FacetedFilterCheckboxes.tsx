import { CheckIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface FacetedFilterCheckboxesProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function FacetedFilterCheckboxes<TData, TValue>({
  column,
  title,
}: FacetedFilterCheckboxesProps<TData, TValue>) {
  // const facets = useMemo(
  //   () =>
  //     [...(column?.getFacetedUniqueValues().entries() || [])].sort(
  //       (a, b) => b[1] - a[1]
  //     ),
  //   [column]
  // );
  const facets = [...(column?.getFacetedUniqueValues().entries() || [])];

  const selectedValuesArr = column?.getFilterValue() as string[];
  const selectedValues = new Set(selectedValuesArr);

  return (
    <Command>
      {facets.length > 5 && <CommandInput placeholder={title} />}
      <CommandList className="max-h-[130px] px-1">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {facets.map(([option, count]) => {
            const isSelected = selectedValues.has(option);
            return (
              <CommandItem
                key={option}
                onSelect={() => {
                  if (isSelected) {
                    selectedValues.delete(option);
                  } else {
                    selectedValues.add(option);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className={cn("h-4 w-4")} />
                </div>
                <span>{option}</span>
                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                  {count}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        {selectedValues.size > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => column?.setFilterValue(undefined)}
                className="justify-center text-center"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}
