import { cn } from "@/lib/utils";
import { Elev, Rata } from "@prisma/client";
import { Input } from "./ui/input";

type Props = {
  elev: Elev & {
    rate: Rata[];
  };
};

function DatorieElev({ elev }: Props) {
  const datorie =
    elev.totalDePlata - elev.rate.reduce((acc, rate) => acc + rate.suma, 0);
  return (
    <Input
      readOnly
      onFocus={(e) => e.target.blur()}
      value={datorie}
      className={cn(
        {
          "text-red-500": datorie > 0,
          "text-green-500": datorie <= 0,
        },
        "focus-visible:"
      )}
    />
  );
}

export default DatorieElev;
