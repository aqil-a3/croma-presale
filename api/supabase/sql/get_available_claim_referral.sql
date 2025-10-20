-- DROP FUNCTION IF EXISTS public.get_available_claim_referral(text);
CREATE OR REPLACE FUNCTION public.get_available_claim_referral(p_wallet_address text)
RETURNS numeric
LANGUAGE sql
STABLE
AS $$
WITH base AS (
  SELECT id
  FROM public.users
  WHERE wallet_address = lower(p_wallet_address)
)
SELECT
  COALESCE(SUM(rrw.bonus_amount), 0) AS total_bonus
FROM public.referral_rewards rrw
JOIN base ON rrw.referrer_id = base.id
WHERE rrw.claimed = false;
$$;
