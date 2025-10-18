-- DROP FUNCTION IF EXISTS public.get_total_referral_bonus(text);
create or replace function public.get_total_referral_bonus (p_wallet_address text) returns numeric language sql stable as $$
WITH base AS (
  SELECT u.id
  FROM public.users u
  WHERE u.wallet_address = lower(p_wallet_address)
)
SELECT COALESCE(SUM(rrw.bonus_amount), 0) AS total_bonus
FROM public.referral_rewards rrw
JOIN base ON rrw.referrer_id = base.id;

$$;