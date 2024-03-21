"use client";

import { updateElev } from "@/actions/actions";
import { CATEGORII } from "@/lib/constants";
import { ElevExtended, TFormularDetaliiElev } from "@/lib/types";
import { formatData } from "@/lib/utils";
import { detaliiElevFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ButonAdaugareRata from "./buton-adaugare-rata";
import CategorieInput from "./categorie-input";
import DatorieElev from "./datorie-elev";
import DisplayRateElev from "./display-rate-elev";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  elev: ElevExtended;
};

function DetaliiElevForm({ elev }: Props) {
  const [editabil, setEditabil] = useState(false);

  const form = useForm<TFormularDetaliiElev>({
    resolver: zodResolver(detaliiElevFormSchema),
    defaultValues: {
      nume: elev.nume,
      cnp: elev.cnp,
      telefon: elev.telefon,
      dataInscriere: formatData(elev.dataInscriere),
      updateAt: formatData(elev.updateAt),
      categorii: elev.categorii,
      totalDePlata: elev.totalDePlata,
      avans: elev.avans,
      nota: elev.nota,
    },
  });

  const handleEdit = () => {
    setEditabil(true);
  };
  const handleAnulare = () => {
    setEditabil(false);
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        action={async () => {
          const result = await form.trigger();
          if (!result) {
            return;
          }
          const data = form.getValues();
          const status = await updateElev(data);
          if (!status.success) {
            toast.error(status.message);
            return;
          }
          if (status.success) {
            toast.success("Elevul a fost actualizat cu succes");
          }
          setEditabil(false);
        }}
      >
        <div className="ml-auto">
          {editabil && (
            <Button type="submit" variant={"destructive"}>
              Salvează
            </Button>
          )}
          {!editabil && <Button onClick={handleEdit}>Editează</Button>}

          {editabil && (
            <Button
              onClick={handleAnulare}
              type="reset"
              variant="secondary"
              className="ml-2"
            >
              Anulează
            </Button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-8">
          <FormField
            control={form.control}
            name="nume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nume</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editabil} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNP</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editabil} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editabil} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="row-start-2 col-start-1">
            <FormField
              control={form.control}
              name="totalDePlata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de plată (RON)</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!editabil} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="row-start-2 col-start-2 space-y-2">
            <Label>Datorie (RON)</Label>
            <DatorieElev elev={elev} />

            {/* <FormField
              control={form.control}
              name="avans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avans (RON)</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!editabil} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div className="row-start-3 col-start-1">
            <FormField
              control={form.control}
              name="dataInscriere"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data inscriere</FormLabel>
                  <FormControl>
                    <Input {...field} disabled type="date-local" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="row-start-3 col-start-2">
            <FormField
              control={form.control}
              name="updateAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ultima actualizare</FormLabel>
                  <FormControl>
                    <Input {...field} disabled type="date-local" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="row-start-4 col-start-1 col-span-full">
            <FormField
              control={form.control}
              name="categorii"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorii</FormLabel>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {CATEGORII.map((categorie) => (
                      <FormControl key={categorie.label}>
                        <CategorieInput
                          label={categorie.label}
                          redobandire={categorie.redobandire}
                          disabled={!editabil}
                          value={
                            field.value.find((c) => c.label === categorie.label)
                              ?.instructor
                          }
                          checked={field.value.some(
                            (c) => c.label === categorie.label
                          )}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  {
                                    label: categorie.label,
                                    instructor: "",
                                    redobandire: categorie.redobandire,
                                  },
                                ])
                              : field.onChange(
                                  field.value.filter(
                                    (c) => c.label !== categorie.label
                                  )
                                );
                          }}
                          onValueChange={(instructor) => {
                            field.onChange(
                              field.value.map((c) =>
                                c.label === categorie.label
                                  ? { ...c, instructor }
                                  : c
                              )
                            );
                          }}
                        />
                      </FormControl>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="row-start-5 col-span-full">
            <div className="flex items-center  justify-between">
              <Label>Rate</Label>
              <ButonAdaugareRata elev={elev} />
            </div>
            <DisplayRateElev rate={elev.rate} />
          </div>
          <div className="row-start-6 col-span-full">
            <FormField
              control={form.control}
              name="nota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notă</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={!editabil}
                      rows={5}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default DetaliiElevForm;
