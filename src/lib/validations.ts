import { z } from "zod";

export const categorieSchema = z.object({
  label: z.string(),
  instructor: z.string(),
  redobandire: z.boolean(),
});

export const rataDataSchema = z.object({
  // id: z.coerce.number(),
  suma: z.coerce.number().positive("Suma ratei trebuie să fie pozitivă"),
  labelCategorie: z.string().trim().min(1, "Categoria este obligatorie"),
  // data: z
  //   .string()
  //   .trim()
  //   .refine(
  //     (val) => {
  //       try {
  //         new Date(val);
  //         return true;
  //       } catch {
  //         return false;
  //       }
  //     },
  //     {
  //       message: "Data rata nu este validă",
  //     }
  //   ),
  observatii: z.union([
    z.literal(""),
    z.string().trim().max(500, "Observații prea lungi"),
  ]),
  // elevCnp: z.string().trim().length(13, "CNP-ul trebuie să aibă 13 caractere"),
});

export const adaugareElevFormSchema = z.object({
  nume: z.string().trim().min(1, "Numele este obligatoriu").max(50),
  cnp: z.string().trim().length(13, "CNP-ul trebuie să aibă 13 caractere"),
  telefon: z.string().trim().min(10, "Numărul de telefon este prea scurt"),
  categorii: z
    .array(categorieSchema)
    .refine(
      (categorii) => categorii.length > 0,
      "Trebuie să selectați cel puțin o categorie"
    )
    .refine(
      (categorii) =>
        !categorii.some(
          (categorie) => !categorie.redobandire && !categorie.instructor
        ),
      {
        message: "Selecteaza instructorul pentru categoria selectata",
      }
    ),
  totalDePlata: z.coerce
    .number()
    .positive("Suma totală trebuie să fie pozitivă"),
  avans: z.coerce.number().min(0, "Suma avansului trebuie să fie pozitivă"),
  nota: z.union([
    z.literal(""),
    z.string().trim().max(1000, "Notă prea lungă"),
  ]),
});

export const detaliiElevFormSchema = z.object({
  nume: z.string().trim().min(1, "Numele este obligatoriu").max(50),
  cnp: z.string().trim().length(13, "CNP-ul trebuie să aibă 13 caractere"),
  telefon: z.string().trim().min(10, "Numărul de telefon este prea scurt"),
  dataInscriere: z
    .string()
    .trim()
    .refine(
      (val) => {
        try {
          new Date(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Data de înscriere nu este validă",
      }
    ),
  updateAt: z
    .string()
    .trim()
    .refine(
      (val) => {
        try {
          new Date(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Data de actualizare nu este validă",
      }
    ),
  categorii: z
    .array(categorieSchema)
    .refine(
      (categorii) => categorii.length > 0,
      "Trebuie să selectați cel puțin o categorie"
    )
    .refine(
      (categorii) =>
        !categorii.some(
          (categorie) => !categorie.redobandire && !categorie.instructor
        ),
      {
        message: "Selecteaza instructorul pentru categoria selectata",
      }
    ),
  totalDePlata: z.coerce
    .number()
    .positive("Suma totală trebuie să fie pozitivă"),
  avans: z.coerce.number().min(0, "Suma avansului trebuie să fie pozitivă"),
  // rate: z.array(rataSchema),
  nota: z.union([
    z.literal(""),
    z.string().trim().max(1000, "Notă prea lungă"),
  ]),
});
