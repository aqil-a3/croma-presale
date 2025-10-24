create or replace function public.get_total_raised () returns numeric language sql stable as $$
 SELECT
  coalesce(sum(i.invested_usd), 0)
FROM
  investments i
WHERE
  i.status = 'finished'
    $$;