
-- Fix views to use security_invoker
DROP VIEW IF EXISTS public.battle_vote_counts;
CREATE VIEW public.battle_vote_counts WITH (security_invoker=on) AS
  SELECT battle_id, side, COUNT(*)::int AS vote_count
  FROM public.battle_votes
  GROUP BY battle_id, side;

DROP VIEW IF EXISTS public.battle_listener_counts;
CREATE VIEW public.battle_listener_counts WITH (security_invoker=on) AS
  SELECT battle_id, COUNT(*)::int AS listener_count
  FROM public.battle_rooms
  WHERE is_active = true
  GROUP BY battle_id;

-- Fix liked_artists missing RLS policies
CREATE POLICY "Users can view their liked artists" ON public.liked_artists FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can like artists" ON public.liked_artists FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike artists" ON public.liked_artists FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Fix liked_songs missing RLS policies
CREATE POLICY "Users can view their liked songs" ON public.liked_songs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can like songs" ON public.liked_songs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike songs" ON public.liked_songs FOR DELETE TO authenticated USING (auth.uid() = user_id);
