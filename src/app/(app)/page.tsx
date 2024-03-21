import { getElevi } from "@/actions/actions";
import AdaugareElev from "@/components/adaugare-elev";
import { columns } from "@/components/data_table/columns";
import DataTable from "@/components/data_table/data-table";
import Title from "@/components/title";
import { Toaster } from "@/components/ui/sonner";

export default async function Home() {
  const elevi = await getElevi();
  return (
    <main>
      <div className="mb-12 mt-6">
        <Title>Elevi</Title>
      </div>
      <div className="flex">
        <div className="ml-auto">
          <AdaugareElev />
        </div>
      </div>

      <div className="mt-6">
        <DataTable columns={columns} data={elevi} />
      </div>

      <Toaster position="top-right" />
    </main>
  );
}
