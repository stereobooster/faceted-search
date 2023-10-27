import { Column } from "@tanstack/react-table";
import { Slider } from "@/components/ui/slider";

interface FacetedFilterSliderProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

// TODO: need to add marks https://github.com/radix-ui/primitives/issues/1188
// TODO: nedd to prohibit marks crossing
export function FacetedFilterSlider<TData, TValue>({
  column,
}: FacetedFilterSliderProps<TData, TValue>) {
  const facets = column?.getFacetedMinMaxValues();
  if (!facets) return;

  const [min, max] = facets;
  return (
    <Slider
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
