"use server";

import prisma from "@/lib/db";
import { RataData } from "@/lib/types";
import {
  adaugareElevFormSchema,
  detaliiElevFormSchema,
  rataDataSchema,
} from "@/lib/validations";
import { Elev, Rata } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function addElev(elev: unknown) {
  const elevValidat = adaugareElevFormSchema.safeParse(elev);
  if (!elevValidat.success) {
    return {
      success: false,
      message: "Elevul nu este valid",
    };
  }

  // Verificăm dacă elevul există deja în baza de date folosind CNP-ul
  const existingElev = await prisma.elev.findUnique({
    where: {
      cnp: elevValidat.data.cnp as string,
    },
  });

  if (existingElev) {
    return {
      success: false,
      message: "Elevul cu acest CNP există deja în baza de date",
    };
  }
  const { avans } = elevValidat.data;
  const rate: RataData[] = [];

  if (avans > 0) {
    const rata: RataData = {
      suma: avans,
      labelCategorie: "Avans",
      observatii: "Avans la înscriere",
    };
    rate.push(rata);
  }

  try {
    await prisma.elev.create({
      data: {
        ...elevValidat.data,
        categorii: {
          create: elevValidat.data.categorii,
        },
        rate: {
          create: rate,
        },
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "Eroare la adaugarea elevului",
    };
  }

  revalidatePath("/", "page");

  return {
    success: true,
    message: "Elevul a fost adăugat cu succes",
  };
}

export async function getElevi() {
  return prisma.elev.findMany({
    include: {
      categorii: true,
      rate: true,
    },
  });
}

export async function getElev(cnp: Elev["cnp"]) {
  const elev = prisma.elev.findUnique({
    where: {
      cnp: cnp,
    },
    include: {
      categorii: true,
      rate: true,
    },
  });

  if (!elev) {
    return notFound();
  }

  return elev;
}

export async function updateElev(elevData: unknown) {
  const elevValidat = detaliiElevFormSchema.safeParse(elevData);
  if (!elevValidat.success) {
    return {
      success: false,
      message: "Datele elevului nu sunt valide",
    };
  }

  const { cnp, categorii, dataInscriere, updateAt, ...restulDatelorElevului } =
    elevValidat.data;

  // Verificăm dacă elevul există în baza de date
  const existingElev = await prisma.elev.findUnique({
    where: { cnp },
  });
  if (!existingElev) {
    return {
      success: false,
      message: "Elevul nu există în baza de date",
    };
  }

  // Update la datele elevului
  try {
    await prisma.elev.update({
      where: { cnp },
      data: {
        ...restulDatelorElevului,
        categorii: {
          // Aici asumăm că vrei să înlocuiești complet categoriile existente cu cele noi
          deleteMany: [{ elevCnp: cnp }], // Ștergem categoriile existente pentru elevul respectiv
          create: categorii, // Creăm noi categorii din datele formularului
        },
      },
    });
  } catch (error) {
    console.error("Eroare la update-ul elevului:", error);
    return {
      success: false,
      message: "Eroare la update-ul elevului",
    };
  }

  revalidatePath(`/elev/${cnp}`, "page");

  return {
    success: true,
    message: "Datele elevului au fost actualizate cu succes",
  };
}

export async function adaugareRata(cnp: string, rata: unknown) {
  const rataValidata = rataDataSchema.safeParse(rata);
  if (!rataValidata.success) {
    return {
      success: false,
      message: "Rata nu este validă",
    };
  }

  try {
    await prisma.rata.create({
      data: {
        elevCnp: cnp,
        ...rataValidata.data,
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "Eroare la adăugarea ratei",
    };
  }

  if (rataValidata.data.labelCategorie === "Avans") {
    try {
      await prisma.elev.update({
        where: { cnp },
        data: {
          avans: {
            increment: rataValidata.data.suma,
          },
        },
      });
    } catch (error) {
      return {
        success: false,
        message: "Eroare la actualizarea avansului",
      };
    }
  }

  revalidatePath(`/elev/${cnp}`, "page");

  return {
    success: true,
    message: "Rata a fost adăugată cu succes",
  };
}

export async function deleteElev(cnp: string) {
  try {
    // Ștergem mai întâi categoriile asociate elevului
    await prisma.categorie.deleteMany({
      where: {
        elevCnp: cnp,
      },
    });

    // Ștergem elevul după CNP
    await prisma.elev.delete({
      where: {
        cnp: cnp,
      },
    });

    return {
      success: true,
      message: "Elevul și categoriile asociate au fost șterse cu succes",
    };
  } catch (error) {
    return {
      success: false,
      message: "Eroare la ștergerea elevului și categoriilor asociate",
    };
  }
}
