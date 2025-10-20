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
  (
    COALESCE(
      (SELECT SUM(rrw.bonus_amount)
       FROM public.referral_rewards rrw
       JOIN base ON rrw.referrer_id = base.id),
      0
    )
    -
    COALESCE(
      (SELECT SUM(rwr.amount)
       FROM public.referral_withdraw_requests rwr
       JOIN base ON rwr.user_id = base.id),
      0
    )
  ) AS available_to_claim;
$$;
