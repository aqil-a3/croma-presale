-- DROP FUNCTION IF EXISTS public.get_referral_tier_by_address(text);

create or replace function public.get_referral_tier_by_address(p_wallet_address text)
returns table (
  total_referrals integer,
  tier text,
  bonus_percent numeric
)
language sql
stable
as $$
  with referrer as (
    select id
    from public.users
    where wallet_address = lower(p_wallet_address)
  ),
  referral_count as (
    select count(*) as total
    from public.users u
    join referrer r on u.referred_by = r.id
  )
  select
    rc.total as total_referrals,
    case
      when rc.total >= 25 then 'Gold'
      when rc.total >= 10 then 'Silver'
      when rc.total >= 1 then 'Bronze'
      else 'None'
    end as tier,
    case
      when rc.total >= 25 then 7
      when rc.total >= 10 then 5
      when rc.total >= 1 then 3
      else 0
    end as bonus_percent
  from referral_count rc;
$$;
