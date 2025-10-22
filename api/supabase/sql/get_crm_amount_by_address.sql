CREATE OR REPLACE FUNCTION public.get_crm_amount_by_address(p_wallet_address text)
RETURNS numeric
LANGUAGE sql
STABLE
AS $$
SELECT
  COALESCE(
    -- ✅ Bagian dari migration_data (dengan filter tambahan)
    (
      SELECT COALESCE(SUM(md.points), 0)
      FROM public.migration_data md
      WHERE md.wallet_address = LOWER(p_wallet_address)
      AND (
        -- Jika source 'airdrop', hanya hitung jika jumlah NFT >= 2
        (md.source = 'airdrop' AND jsonb_array_length(md.airdrop_nft_tasks) >= 2)
        -- Jika source bukan 'airdrop', tetap hitung
        OR (md.source IS DISTINCT FROM 'airdrop')
      )
    )
    +
    -- ✅ Bagian dari investments
    (
      SELECT COALESCE(SUM(inv.crm_amount), 0)
      FROM public.investments inv
      WHERE inv.wallet_address = LOWER(p_wallet_address)
      AND inv.status IN ('completed', 'paid', 'success', 'finished')
    ),
    0
  )
$$;
