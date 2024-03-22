"use client";

import { addElev } from "@/actions/actions";
import { CATEGORII } from "@/lib/constants";
import { TFormularAdaugaElev } from "@/lib/types";
import { adaugareElevFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CategorieInput from "./categorie-input";
import FormButton from "./form-button";
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
import { Textarea } from "./ui/textarea";

type FormularAdaugaElevProps = {
  onFormSubmision: () => void;
};

function FormularAdaugaElev({ onFormSubmision }: FormularAdaugaElevProps) {
  const form = useForm<TFormularAdaugaElev>({
    resolver: zodResolver(adaugareElevFormSchema),
    defaultValues: {
      nume: "",
      cnp: "",
      telefon: "",
      categorii: [],
      totalDePlata: 0,
      avans: 0,
      nota: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3"
        action={async () => {
          const result = await form.trigger();
          if (!result) {
            return;
          }
          const data = form.getValues();
          const status = await addElev(data);
          if (!status.success) {
            toast.error(status.message);
            return;
          }
          if (status.success) {
            toast.success("Elevul a fost adăugat cu succes");
          }
          onFormSubmision();
        }}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="nume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nume și prenume</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="telefon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nr. Telefon</FormLabel>
              <FormControl>
                <Input {...field} type="tel" autoComplete="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="totalDePlata"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total de plată</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avans</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categorii"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorii</FormLabel>
              <div className="grid md:grid-cols-2 gap-y-2 gap-x-8">
                {CATEGORII.map((categorie) => (
                  <FormControl key={categorie.label}>
                    <CategorieInput
                      label={categorie.label}
                      redobandire={categorie.redobandire}
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

        <FormField
          control={form.control}
          name="nota"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notă</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  rows={5}
                  spellCheck={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton>
          <Button type="submit">Adaugă</Button>
        </FormButton>
      </form>
    </Form>
  );
}

export default FormularAdaugaElev;
