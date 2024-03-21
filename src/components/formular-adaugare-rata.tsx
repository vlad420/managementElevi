import { adaugareRata } from "@/actions/actions";
import { RataData } from "@/lib/types";
import { rataDataSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categorie, Elev } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

type Props = {
  elev: Elev & {
    categorii: Categorie[];
  };
  onFormSubmision: () => void;
};

function FormularAdaugareRata({ elev, onFormSubmision }: Props) {
  const form = useForm<RataData>({
    resolver: zodResolver(rataDataSchema),
    defaultValues: {
      suma: 0,
      labelCategorie: "",
      observatii: "",
    },
  });

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
          const status = await adaugareRata(elev.cnp, data);
          if (!status.success) {
            toast.error(status.message);
            return;
          }
          if (status.success) {
            toast.success("Rata a fost adăugată cu succes");
          }
          // console.log(data);
          onFormSubmision();
        }}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="suma"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Suma</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="labelCategorie"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Categorie</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categoriile elevului</SelectLabel>
                      {elev.avans <= 0 && (
                        <SelectItem value="avans">Avans</SelectItem>
                      )}
                      {elev.categorii.map((categorie) => (
                        <SelectItem key={categorie.id} value={categorie.label}>
                          {categorie.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="space-y-2 w-full">
            <Label htmlFor="nota">Categoria</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selectează categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoriile elevului</SelectLabel>
                  {elev.avans <= 0 && (
                    <SelectItem value="avans">Avans</SelectItem>
                  )}
                  {elev.categorii.map((categorie) => (
                    <SelectItem key={categorie.id} value={categorie.label}>
                      {categorie.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
        </div>
        <FormField
          control={form.control}
          name="observatii"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observații</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div>
          <Label>Observații</Label>
          <Textarea id="observatii" name="observatii" className="resize-none" />
        </div> */}
        <Button className="ml-auto" type="submit">
          Adaugă
        </Button>
      </form>
    </Form>
  );
}

export default FormularAdaugareRata;
