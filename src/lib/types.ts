import { z } from "zod";
import {
  adaugareElevFormSchema,
  detaliiElevFormSchema,
  rataDataSchema,
} from "./validations";
import { Categorie, Elev, Rata } from "@prisma/client";

export type ElevExtended = Elev & {
  categorii: Categorie[];
  rate: Rata[];
};

export type TFormularAdaugaElev = z.infer<typeof adaugareElevFormSchema>;
export type TFormularDetaliiElev = z.infer<typeof detaliiElevFormSchema>;
export type RataData = z.infer<typeof rataDataSchema>;
