import { Categorie, Elev } from "@prisma/client";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import FormularAdaugareRata from "./formular-adaugare-rata";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  elev: Elev & {
    categorii: Categorie[];
  };
};

function ButonAdaugareRata({ elev }: Props) {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="icon" variant="ghost">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adaugă rată</DialogTitle>
        </DialogHeader>
        <FormularAdaugareRata elev={elev} onFormSubmision={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default ButonAdaugareRata;
