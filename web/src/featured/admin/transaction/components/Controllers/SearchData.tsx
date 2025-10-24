import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import axios, { isAxiosError } from "axios";
import { LucideIcon, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAdminTransactionContext } from "../../provider";
import { useRouter } from "next/navigation";

interface Props {
  apiRoute: string;
  label: string;
  inputId: string;
  TriggerIcon: LucideIcon;
}

export function SearchData({
  TriggerIcon,
  apiRoute,
  inputId,
  label,
}: Props) {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTrxData, transaction, trxData } = useAdminTransactionContext();
  const router = useRouter();

  const searchHandler = async () => {
    if (!value) return toast.info("Field Data Required");

    try {
      setIsLoading(true);
      const { data } = await axios.get(`${apiRoute}/${value}`);
      setTrxData(data);

      // router.replace("/admin/transaction?page=1");

      toast.success("Data Found");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;
        toast.error(data?.message ?? "Something error");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isSame = useMemo(() => {
    const initDataString = JSON.stringify(transaction);
    const currentDataString = JSON.stringify(trxData);
    return initDataString === currentDataString;
  }, [trxData, transaction]);

  const resetHandler = () => {
    setTrxData(transaction);
    setValue("");
    router.replace("/admin/transaction?page=1");
    toast.info("Data reset to page 1");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="border border-white">
          <TriggerIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="black bg-black border border-orange-500 text-white space-y-4">
        <Label htmlFor={inputId}>{label}</Label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={inputId}
          placeholder={`${label}...`}
          disabled={isLoading}
        />

        <div className="flex gap-4 justify-between">
          <Button
            onClick={searchHandler}
            variant="outline"
            disabled={isLoading}
            className="text-black flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Spinner /> <span>Searching...</span>
              </>
            ) : (
              <>
                <Search /> <span>Search</span>
              </>
            )}
          </Button>

          {!isSame && (
            <Button
              onClick={resetHandler}
              variant="destructive"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RotateCcw /> Reset
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
