"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import FormularAdaugaElev from "./formular-adauga-elev";

function AdaugareElev() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adaugă Elev</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adaugă elev</DialogTitle>

          <DialogDescription>
            Înregistrează elevul in baza de date
          </DialogDescription>
        </DialogHeader>

        <FormularAdaugaElev onFormSubmision={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default AdaugareElev;
