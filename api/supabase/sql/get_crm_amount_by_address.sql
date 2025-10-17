create or replace function public.get_crm_amount_by_address(p_wallet_address text)
returns numeric
language sql
stable 
as $$
SELECT
    coalesce(
        -- Data dari table migrasi data
        (
            SELECT
                coalesce(sum(md.points), 0)
            FROM
                public.migration_data md
            WHERE
                md.wallet_address = p_wallet_address
        ) +
        -- Data dari table investments
        (
            SELECT
                coalesce(sum(inv.crm_amount), 0)
            from
                public.investments inv
            WHERE
                inv.wallet_address = p_wallet_address
                and inv.status IN ('completed', 'paid')
        )
    )
    $$;