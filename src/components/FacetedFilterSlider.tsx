import { Column } from "@tanstack/react-table";
import { Slider } from "@/components/ui/slider";
import { useMemo } from "react";

interface FacetedFilterSliderProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function FacetedFilterSlider<TData, TValue>({
  column,
}: FacetedFilterSliderProps<TData, TValue>) {
  const facetsMemo = useMemo(
    () => column?.getFacetedMinMaxValues(),
    [column?.getFacetedMinMaxValues()?.length]
  );
  const facets = column?.getFacetedMinMaxValues();
  if (!facets || !facetsMemo) return;

  const [min, max] = facetsMemo;
  return (
    <Slider
      // @ts-expect-error xxx
      value={column?.getFilterValue() || facets}
      onValueChange={(x) => {
        column?.setFilterValue(x);
      }}
      max={max}
      min={min}
      step={0.01}
      defaultValue={facets}
      minStepsBetweenThumbs={100}
    />
  );
}
