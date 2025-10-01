import { useForm } from "react-hook-form";
import { PresaleFormValues, presaleSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Props {
  onSubmit: (values: PresaleFormValues) => Promise<void> | void;
  defaultValues?: PresaleFormValues;
}

export function PresaleForm({ onSubmit, defaultValues }: Props) {
  const form = useForm<PresaleFormValues>({
    resolver: zodResolver(presaleSchema),
    defaultValues: defaultValues ?? {
      current_price_usd: 0,
      end_at: "",
      is_active: false,
      target_raised: 0,
      title: "",
      total_raised: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presale Title</FormLabel>
                <FormControl>
                  <Input placeholder="Presale Title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Active?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(e) => field.onChange(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="end_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End At</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Presale Title..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="current_price_usd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Presale Title..."
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="target_raised"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Raised</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Target Raised..."
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="total_raised"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Raised</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Total Raised..."
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
