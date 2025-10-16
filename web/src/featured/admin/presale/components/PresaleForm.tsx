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
      global_stage: 0,
      crm_sold: 0,
      cmc_sold: 0,
      potential_value: 0,
      headers_count: 0,
      crm_allocated: 0,
      budget_estimation: 0,
      cmc_bonus_per_stage: 0,
      cmc_bonus_per_usd: 0,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="global_stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Global Stage</FormLabel>
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

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="crm_sold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRM Sold</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="CRM Sold..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cmc_sold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CMC Sold</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="CMC Sold..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="potential_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potential Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="Potential Value..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="headers_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headers Count</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="Headers Count..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="crm_allocated"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRM Allocated</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="CRM Allocated..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget_estimation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Estimation</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="Budget Estimation..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cmc_bonus_per_stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CMC Bonus Perstage</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="CMC Bonus Perstage..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cmc_bonus_per_usd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CMC Bonus Per Usd</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="number"
                    placeholder="CMC Bonus Per Usd..."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
