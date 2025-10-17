-- DROP FUNCTION IF EXISTS public.get_total_referral_by_address(text);

create or replace function public.get_total_referral_by_address(p_wallet_address text)
returns numeric
language sql
stable
as $$
  with referrer as (
    select id
    from public.users
    where wallet_address = lower(p_wallet_address)
  )
  select
    count(*)::numeric
  from public.users u
  join referrer r on u.referred_by = r.id;
$$;
