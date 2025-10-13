import { PaymentSettingValue, SettingAdminDb } from "@/@types/setting-admin";
import { useAdminSetting } from "../../provider";
import { PaymentMethodDialog } from "./PaymentMethodDialog";
import { Badge } from "@/components/ui/badge";

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
      <div className="space-x-4">
        {currencies.map((d) => (
          <Badge variant={"outline"} key={d} className="text-white">
            {d.toUpperCase()}
          </Badge>
        ))}
      </div>
      <PaymentMethodDialog initSelected={currencies} />
    </div>
  );
}
