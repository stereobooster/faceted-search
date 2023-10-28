import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function App() {
  return (
    <div className="bg-background flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Faceted search experiments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <a href="/pages/tanstack/" className="underline">
              Tanstack
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Tanstack table with{" "}
            <a
              href="https://tanstack.com/table/v8/docs/api/features/filters#getfacetedrowmodel"
              className="underline"
            >
              native faceting functionality
            </a>
          </p>
          <Separator className="my-2" />
          <p>
            <a href="/pages/orama/" className="underline">
              Orama
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Tanstack table with Orama{" "}
            <a
              href="https://docs.oramasearch.com/usage/search/introduction"
              className="underline"
            >
              full text search
            </a>{" "}
            and{" "}
            <a
              href="https://docs.oramasearch.com/usage/search/facets"
              className="underline"
            >
              faceting
            </a>
          </p>
          <Separator className="my-2" />
          <p>
            <a href="/pages/itemsjs/" className="underline">
              ItemsJS
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Tanstack table with{" "}
            <a href="https://github.com/itemsapi/itemsjs" className="underline">
              ItemsJS for faceting
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
