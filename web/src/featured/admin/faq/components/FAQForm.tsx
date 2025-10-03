import { useForm } from "react-hook-form";
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
import { FaqFormValues, faqSchema } from "../schema";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSubmit: (values: FaqFormValues) => Promise<void> | void;
  defaultValues?: FaqFormValues;
}

export function FaqForm({ onSubmit, defaultValues }: Props) {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea disabled={isSubmitting} placeholder="Answer..." {...field} />
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
