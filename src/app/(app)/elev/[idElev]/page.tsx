import { getElev } from "@/actions/actions";
import DetaliiElevForm from "@/components/detalii-elev-form";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { formatData } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";

type Props = {
  params: {
    idElev: string;
  };
};

async function Page({ params }: Props) {
  const elev = await getElev(params.idElev);
  return (
    <main>
      <div className="mb-12 mt-6 flex gap-6">
        <Button size="icon" variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <Title>{elev?.nume}</Title>
      </div>

      <DetaliiElevForm elev={elev!} key={formatData(elev!.updateAt)} />

      <Toaster position="top-right" />
    </main>
  );
}

export default Page;

/*
{
  cnp: '1940309100184',
  nume: 'Mehedințu Mircea Vlăduț',
  telefon: '+40765704250',
  totalDePlata: 3500,
  avans: 1000,
  nota: 'Vrea să termine pe 15 Aprilie',
  dataInscriere: 2024-03-18T21:41:38.474Z,
  updateAt: 2024-03-18T21:41:38.474Z,
  categorii: [
    {
      id: 19,
      label: 'CE',
      instructor: 'Iancu Iulică',
      redobandire: false,
      elevCnp: '1940309100184'
    },
    {
      id: 20,
      label: 'C',
      instructor: 'Scripcaru Robert',
      redobandire: false,
      elevCnp: '1940309100184'
    }
  ],
  rate: []
} 
*/
