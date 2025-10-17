import {
  NumberSettingValue,
  SettingAdminDb,
  SettingAdminDbKey,
} from "@/@types/setting-admin";
import { useAdminSetting } from "../../provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  settingKey: SettingAdminDbKey;
}

export function NumberSetting({ settingKey }: Props) {

  const [value, setValue] = useState<number>(0);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { settings } = useAdminSetting();
  const router = useRouter();

  const currentSetting = settings.find(
    (setting) => setting.key === settingKey
  ) as SettingAdminDb<NumberSettingValue> | undefined;

  useEffect(() => {
    if (!currentSetting) return;
    setValue(currentSetting.value);
  }, [currentSetting]);

  useEffect(() => {
    if (!currentSetting) return;
    if (currentSetting.value !== value) {
      setIsChanging(true);
      return;
    }
    setIsChanging(false);
  }, [value, currentSetting]);

  if (!currentSetting) return null;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(target.valueAsNumber);
  };

  const editHandler = async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/setting/admin", { settingKey, value });
      toast.success(`${currentSetting.label} is successfully updated`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something wrong");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor={currentSetting.key}>{currentSetting.label}</Label>
      <Input
        type="number"
        id={currentSetting.key}
        value={value}
        onChange={changeHandler}
        disabled={isLoading}
        className="selection:bg-white selection:text-black"
      />
      {isChanging && (
        <div className="space-x-2">
          <Button
            variant={"outline"}
            className="text-black"
            onClick={editHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
          <Button
            variant={"outline"}
            className="text-black"
            onClick={() => setValue(currentSetting.value)}
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
