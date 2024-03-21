"use client";

import { Categorie, Elev, Rata } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const columns: ColumnDef<
  Elev & {
    categorii: Categorie[];
    rate: Rata[];
  }
>[] = [
  {
    accessorKey: "nume",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nume și prenume
        <ArrowUp className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { nume: NumeElev, cnp: cnpElev } = row.original;
      return (
        <Link href={`/elev/${cnpElev}`} className="w-full inline-block">
          {NumeElev}
        </Link>
      );
    },
  },
  {
    accessorKey: "cnp",
    header: "CNP",
  },
  {
    accessorKey: "telefon",
    header: "Telefon",
  },
  {
    accessorKey: "categorii",
    header: "Categorii",
    cell: ({ row }) => {
      const categorii: Categorie[] = row.getValue("categorii");
      return categorii.map((categorie) => categorie.label).join(", ");
    },
  },

  {
    id: "achitat",
    header: "Achitat",
    cell: ({ row }) => {
      const avans: number = row.original.rate.reduce(
        (acc, rate) => acc + rate.suma,
        0
      );
      const totalDePlata: number = row.original.totalDePlata;
      return avans >= totalDePlata ? (
        <span className="text-green-500 font-semibold">DA</span>
      ) : (
        <span className="text-destructive font-semibold">NU</span>
      );
    },
  },
];
