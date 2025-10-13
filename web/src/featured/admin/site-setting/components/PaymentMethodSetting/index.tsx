import { PaymentSettingValue, SettingAdminDb } from "@/@types/setting-admin";
import { useAdminSetting } from "../../provider";
import { PaymentMethodDialog } from "./PaymentMethodDialog";
import { Badge } from "@/components/ui/badge";
import { TokenIcon } from "@web3icons/react";

export function PaymentMethod() {
  const { settings } = useAdminSetting();
  const paymentSetting = settings.find(
    (setting) => setting.key === "payment_methods"
  ) as SettingAdminDb<PaymentSettingValue> | undefined;

  if (!paymentSetting) return null;
  const data = paymentSetting.value.value;
  const currencies = data.map((d) => d.currency);

  return (
    <div className="space-y-4">
      <p className="font-semibold">{paymentSetting.label}</p>
      <div className="flex gap-2">
        {currencies.map((d) => (
          <div key={d} className="flex gap-1">
            <TokenIcon symbol={d.toLowerCase()} variant="branded" />
            <Badge variant={"outline"} className="text-white">
              {d.toUpperCase()}
            </Badge>
          </div>
        ))}
      </div>
      <PaymentMethodDialog initSelected={currencies} />
    </div>
  );
}
