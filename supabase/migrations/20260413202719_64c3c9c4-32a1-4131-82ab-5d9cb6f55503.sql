
-- Battles table
CREATE TABLE public.battles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('live', 'upcoming', 'ended')),
  artist_a_name TEXT NOT NULL,
  artist_a_image TEXT,
  artist_a_region TEXT,
  artist_b_name TEXT NOT NULL,
  artist_b_image TEXT,
  artist_b_region TEXT,
  song_a TEXT NOT NULL,
  song_b TEXT NOT NULL,
  host_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  host_name TEXT NOT NULL,
  co_hosts TEXT[] DEFAULT '{}',
  region TEXT NOT NULL DEFAULT 'Zambia',
  round INTEGER NOT NULL DEFAULT 0,
  total_rounds INTEGER NOT NULL DEFAULT 3,
  winner TEXT CHECK (winner IN ('A', 'B')),
  scheduled_time TIMESTAMPTZ,
  ended_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.battles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view battles" ON public.battles FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create battles" ON public.battles FOR INSERT TO authenticated WITH CHECK (auth.uid() = host_user_id);
CREATE POLICY "Hosts can update their battles" ON public.battles FOR UPDATE TO authenticated USING (auth.uid() = host_user_id);

CREATE TRIGGER update_battles_updated_at BEFORE UPDATE ON public.battles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Battle votes table
CREATE TABLE public.battle_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  battle_id UUID NOT NULL REFERENCES public.battles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('A', 'B')),
  round INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (battle_id, user_id, round)
);

ALTER TABLE public.battle_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view votes" ON public.battle_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote" ON public.battle_votes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_battle_votes_battle ON public.battle_votes(battle_id);

-- Battle rooms (presence tracking)
CREATE TABLE public.battle_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  battle_id UUID NOT NULL REFERENCES public.battles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'audience' CHECK (role IN ('host', 'co-host', 'speaker', 'audience')),
  is_muted BOOLEAN NOT NULL DEFAULT true,
  is_speaking BOOLEAN NOT NULL DEFAULT false,
  display_name TEXT,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (battle_id, user_id)
);

ALTER TABLE public.battle_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view room participants" ON public.battle_rooms FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join rooms" ON public.battle_rooms FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own presence" ON public.battle_rooms FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can leave rooms" ON public.battle_rooms FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX idx_battle_rooms_battle ON public.battle_rooms(battle_id);

-- View for vote counts per battle per side
CREATE VIEW public.battle_vote_counts AS
  SELECT battle_id, side, COUNT(*)::int AS vote_count
  FROM public.battle_votes
  GROUP BY battle_id, side;

-- View for listener counts per battle
CREATE VIEW public.battle_listener_counts AS
  SELECT battle_id, COUNT(*)::int AS listener_count
  FROM public.battle_rooms
  WHERE is_active = true
  GROUP BY battle_id;
