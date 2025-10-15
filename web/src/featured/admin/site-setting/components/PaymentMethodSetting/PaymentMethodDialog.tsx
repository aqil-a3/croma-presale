"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react"; // ✅ ikon check dari lucide-react
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const getData = async (): Promise<string[]> => {
  const { data } = await axios.get("/api/setting/admin/payments");
  return data;
};

interface Props {
  initSelected: string[];
}

export function PaymentMethodDialog({ initSelected }: Props) {
  const [data, setData] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>(initSelected);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const perPage = 12;

  useEffect(() => {
    (async () => {
      const value = await getData();
      setData(value);
    })();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((d) => d.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / perPage);
  const startIndex = (page - 1) * perPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + perPage);

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
  };

  const toggleSelect = (item: string) => {
    if (isLoading) return;
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/setting/admin", {
        settingKey: "payment_methods",
        value: selected,
      });
      toast.success(`Payment Method updated!`);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something Error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className="bg-white text-black cursor-pointer rounded-xl px-4 py-2 font-semibold shadow-sm hover:bg-gray-100">
        Select Methods
      </DialogTrigger>

      <DialogContent className="w-11/12 sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex flex-col gap-1">
            Select Payment Methods
            {selected.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {selected.map((item) => (
                  <span
                    key={item}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {item.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            These selected methods will be used in your website.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 mb-4">
          <Input
            placeholder="Search payment methods..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {currentPageData.map((d) => {
            const earlyChar = d.slice(0, 2).toUpperCase();
            const color = stringToColor(d);
            const isSelected = selected.includes(d);

            return (
              <div
                key={d}
                onClick={() => toggleSelect(d)}
                className={`relative flex flex-col items-center justify-center border rounded-xl p-3 transition-all cursor-pointer 
                  ${
                    isSelected
                      ? "bg-blue-50 border-blue-400 shadow-md"
                      : "bg-white hover:shadow-sm"
                  }`}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg mb-2"
                  style={{ backgroundColor: color }}
                >
                  {earlyChar}
                </div>

                <p className="text-sm text-gray-800 font-medium text-center truncate w-full">
                  {d.toUpperCase()}
                </p>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Check size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            disabled={selected.length === 0 || isLoading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              "Save Selection"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
