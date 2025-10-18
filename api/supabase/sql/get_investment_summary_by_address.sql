-- DROP FUNCTION IF EXISTS public.get_investment_summary_by_address(text);
create or replace function public.get_investment_summary_by_address (p_wallet_address text) returns table (
  invested_usd numeric,
  crm_owned numeric,
  cmc_owned numeric,
  referral_earnings numeric
) language sql stable as $$
with base as (
  select
    public.get_crm_amount_by_address(p_wallet_address) as crm_owned,
    public.get_cmc_amount_by_address(p_wallet_address) as cmc_owned,
    public.get_total_referral_bonus(p_wallet_address) as referral_earnings
)
select 
coalesce((b.crm_owned * 0.09) + (b.cmc_owned * 0.001), 0) as invested_usd,
b.crm_owned,
b.cmc_owned,
b.referral_earnings
 from base b
$$;