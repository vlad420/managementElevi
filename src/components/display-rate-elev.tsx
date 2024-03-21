import { formatData } from "@/lib/utils";
import { Rata } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Props = {
  rate: Rata[];
};

function DisplayRateElev({ rate }: Props) {
  return (
    <Table className="whitespace-nowrap ">
      <TableHeader>
        <TableRow>
          <TableHead>Rata Nr.</TableHead>
          <TableHead>Suma (RON)</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="">Observatii</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rate.length > 0 ? (
          rate.map((rata, index) => (
            <TableRow key={rata.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{rata.suma}</TableCell>
              <TableCell>{rata.labelCategorie}</TableCell>
              <TableCell>{formatData(rata.data)}</TableCell>
              <TableCell className="whitespace-normal w-full ">
                {rata.observatii}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Elevul nu a achitat nicio rata
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DisplayRateElev;
