import { z } from "zod";
import {
  adaugareElevFormSchema,
  detaliiElevFormSchema,
  rataDataSchema,
} from "./validations";

export type TFormularAdaugaElev = z.infer<typeof adaugareElevFormSchema>;
export type TFormularDetaliiElev = z.infer<typeof detaliiElevFormSchema>;
export type RataData = z.infer<typeof rataDataSchema>;
