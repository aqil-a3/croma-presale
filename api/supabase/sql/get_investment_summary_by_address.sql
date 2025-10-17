-- DROP FUNCTION IF EXISTS public.get_investment_summary_by_address(text);
create or replace function public.get_investment_summary_by_address (p_wallet_address text) returns table (
  invested_usd numeric,
  crm_owned numeric,
  cmc_owned numeric
) language sql stable as $$
with base as (
  select
    public.get_crm_amount_by_address(p_wallet_address) as crm_owned,
    coalesce(sum(inv.cmc_amount),  0) as cmc_owned
  from public.investments inv
  where inv.wallet_address = p_wallet_address
    and inv.status in ('success')
)
select 
coalesce((b.crm_owned * 0.09) + (b.cmc_owned * 0.001), 0) as invested_usd,
b.crm_owned,
b.cmc_owned
 from base b
$$;