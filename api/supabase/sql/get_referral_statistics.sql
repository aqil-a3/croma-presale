-- DROP FUNCTION get_referral_statistics(uuid);

-- CREATE OR REPLACE FUNCTION public.get_referral_statistics(p_user_id uuid)
-- RETURNS TABLE (
--   total_referrals int,
--   total_earned numeric(18,2),
--   available_to_claim numeric(18,2),
--   current_tier text,
--   commission_rate numeric(5,2)
-- )
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--   RETURN QUERY
--   WITH referrals AS (
--     SELECT id
--     FROM public.users
--     WHERE referred_by = p_user_id
--   ),
--   referral_investments AS (
--     SELECT
--       i.user_id,
--       SUM(i.invested_usd) AS total_invested
--     FROM public.investments i
--     JOIN referrals r ON r.id = i.user_id
--     WHERE i.status IN ('completed', 'paid')
--     GROUP BY i.user_id
--   ),
--   agg AS (
--     SELECT
--       COUNT(DISTINCT r.id)::int AS total_referrals,
--       COALESCE(SUM(ri.total_invested), 0) AS total_invested_sum
--     FROM referrals r
--     LEFT JOIN referral_investments ri ON r.id = ri.user_id
--   )
--   SELECT
--     a.total_referrals,
--     -- total_earned dihitung berdasarkan tier
--     ROUND(
--       a.total_invested_sum *
--       CASE
--         WHEN a.total_referrals >= 25 THEN 0.07
--         WHEN a.total_referrals >= 10 THEN 0.05
--         WHEN a.total_referrals > 0 THEN 0.03
--         ELSE 0
--       END, 2
--     ) AS total_earned,
--     -- available_to_claim sama dengan total_earned (nanti bisa dikurangi klaim)
--     ROUND(
--       a.total_invested_sum *
--       CASE
--         WHEN a.total_referrals >= 25 THEN 0.07
--         WHEN a.total_referrals >= 10 THEN 0.05
--         WHEN a.total_referrals > 0 THEN 0.03
--         ELSE 0
--       END, 2
--     ) AS available_to_claim,
--     CASE
--       WHEN a.total_referrals >= 25 THEN 'Gold'
--       WHEN a.total_referrals >= 10 THEN 'Silver'
--       WHEN a.total_referrals > 0 THEN 'Bronze'
--       ELSE 'Bronze'
--     END AS current_tier,
--     -- tampilkan juga rate-nya agar jelas
--     CASE
--       WHEN a.total_referrals >= 25 THEN 0.07
--       WHEN a.total_referrals >= 10 THEN 0.05
--       WHEN a.total_referrals > 0 THEN 0.03
--       ELSE 0
--     END AS commission_rate
--   FROM agg a;
-- END;
-- $$;

CREATE OR REPLACE FUNCTION public.get_referral_statistics(p_wallet_address text)
RETURNS TABLE (
  total_referrals int,
  total_earned numeric(18,2),
  available_to_claim numeric(18,2),
  current_tier text,
  commission_rate numeric(5,2)
)
LANGUAGE sql
STABLE
AS $$
SELECT
  -- ambil total referral dari fungsi tier
  (SELECT total_referrals
   FROM public.get_referral_tier_by_address(lower(p_wallet_address))) AS total_referrals,

  -- total bonus/earned
  (SELECT *
   FROM public.get_total_referral_bonus(lower(p_wallet_address))) AS total_earned,

  -- available to claim
  (SELECT *
   FROM public.get_available_claim_referral(lower(p_wallet_address))) AS available_to_claim,

  -- current tier
  (SELECT tier
   FROM public.get_referral_tier_by_address(lower(p_wallet_address))) AS current_tier,

  -- commission rate
  (SELECT bonus_percent
   FROM public.get_referral_tier_by_address(lower(p_wallet_address))) AS commission_rate;
$$;
