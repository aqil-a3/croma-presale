create or replace function public.get_cmc_amount_by_address (p_wallet_address text) returns numeric language sql stable as $$
            SELECT
                coalesce(sum(inv.cmc_amount), 0)
            from
                public.investments inv
            WHERE
                inv.wallet_address = p_wallet_address
                and inv.status IN ('completed', 'paid', 'success', 'finished')

    $$;