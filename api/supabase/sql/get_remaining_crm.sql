create or replace function public.get_remaining_crm()
returns numeric
language sql
stable
as $$
  with active_presale as (
    select stage, phase, crm_allocated
    from public.presale
    where is_active = true
  ),
  -- Total CRM dari pembelian investor
  finished_trx as (
    select crm_amount, stage, phase
    from public.investments
    where status = 'finished'
  ),
  -- Total CRM dari bonus referral
  referral_bonus as (
    select rbb.crm_bonus, i.stage, i.phase
    from public.referral_buy_bonus rbb
    join public.investments i on rbb.order_id = i.order_id
  )
  select 
    ap.crm_allocated
      - coalesce(sum(distinct ft.crm_amount), 0)
      - coalesce(sum(distinct rb.crm_bonus), 0)
    as remaining_crm
  from active_presale ap
  left join finished_trx ft 
    on ft.stage = ap.stage
   and ft.phase = ap.phase
  left join referral_bonus rb 
    on rb.stage = ap.stage
   and rb.phase = ap.phase
  group by ap.crm_allocated;
$$;
