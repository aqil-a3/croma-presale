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

interface Props {
  onSubmit: (values: PresaleFormValues) => Promise<void> | void;
  defaultValues?: PresaleFormValues;
}

export function PresaleForm({ onSubmit, defaultValues }: Props) {
  const form = useForm<PresaleFormValues>({
    resolver: zodResolver(presaleSchema),
    defaultValues: defaultValues ?? {
      current_price_usd: 0,
      next_price_usd: 0,
      end_at: "",
      is_active: false,
      target_raised: 0,
      phase: 1,
      stage: 1,
      total_raised: 0,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stage</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="Stage..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phase</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="Phase..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  disabled={isSubmitting}
                  type="datetime-local"
                  placeholder="Presale Title..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="current_price_usd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
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
            name="next_price_usd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
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
        </div>

        <FormField
          control={form.control}
          name="target_raised"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Raised</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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

        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
      </form>
    </Form>
  );
}
