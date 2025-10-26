"use client";

import { InvestmentLeaderboardItem } from "@/@types/investment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  wallet_address: z.string(),
  total_invested_usd: z.number(),
});

interface Props {
  setData: React.Dispatch<React.SetStateAction<InvestmentLeaderboardItem[]>>;
}

export function FakeBuyerForm({ setData }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      wallet_address: "",
      total_invested_usd: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setData((prev) => [...prev, values]);
    form.reset();
  }

  function fillRandomData() {
    const randomWallet = `0x${Array.from({ length: 40 })
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("")}`;

    const randomUsername = `Anonymous`;

    const randomInvestment = Number((Math.random() * 1000 + 10).toFixed(2));

    form.setValue("username", randomUsername);
    form.setValue("wallet_address", randomWallet);
    form.setValue("total_invested_usd", randomInvestment);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wallet_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="total_invested_usd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Invested USD</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Total Invested USD"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-2">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="secondary" onClick={fillRandomData}>
            Fill Random Data
          </Button>
          <Button type="button" variant="secondary" onClick={() => setData([])}>
            Reset Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
