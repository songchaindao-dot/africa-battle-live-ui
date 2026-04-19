export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audience_profiles: {
        Row: {
          avatar_url: string | null
          base_name: string | null
          base_profile_link: string | null
          bio: string | null
          cover_photo_url: string | null
          cover_url: string | null
          created_at: string | null
          display_name: string | null
          id: string
          location: string | null
          onboarding_completed: boolean
          profile_name: string | null
          twitter_url: string | null
          updated_at: string | null
          user_id: string
          username: string | null
          wallet_address: string | null
          x_profile: string | null
          x_profile_link: string | null
        }
        Insert: {
          avatar_url?: string | null
          base_name?: string | null
          base_profile_link?: string | null
          bio?: string | null
          cover_photo_url?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          location?: string | null
          onboarding_completed?: boolean
          profile_name?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
          wallet_address?: string | null
          x_profile?: string | null
          x_profile_link?: string | null
        }
        Update: {
          avatar_url?: string | null
          base_name?: string | null
          base_profile_link?: string | null
          bio?: string | null
          cover_photo_url?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          location?: string | null
          onboarding_completed?: boolean
          profile_name?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
          wallet_address?: string | null
          x_profile?: string | null
          x_profile_link?: string | null
        }
        Relationships: []
      }
      battle_room_messages: {
        Row: {
          battle_id: string
          created_at: string
          id: string
          message_text: string
          room_id: string
          user_id: string
        }
        Insert: {
          battle_id: string
          created_at?: string
          id?: string
          message_text: string
          room_id: string
          user_id: string
        }
        Update: {
          battle_id?: string
          created_at?: string
          id?: string
          message_text?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_room_messages_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_rooms: {
        Row: {
          avatar_url: string | null
          battle_id: string
          display_name: string | null
          id: string
          is_active: boolean
          is_muted: boolean
          is_speaking: boolean
          joined_at: string
          last_seen_at: string
          mic_on: boolean | null
          role: string
          room_id: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          battle_id: string
          display_name?: string | null
          id?: string
          is_active?: boolean
          is_muted?: boolean
          is_speaking?: boolean
          joined_at?: string
          last_seen_at?: string
          mic_on?: boolean | null
          role?: string
          room_id?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          battle_id?: string
          display_name?: string | null
          id?: string
          is_active?: boolean
          is_muted?: boolean
          is_speaking?: boolean
          joined_at?: string
          last_seen_at?: string
          mic_on?: boolean | null
          role?: string
          room_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_rooms_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_votes: {
        Row: {
          battle_id: string
          created_at: string
          id: string
          round: number
          side: string
          user_id: string
        }
        Insert: {
          battle_id: string
          created_at?: string
          id?: string
          round?: number
          side: string
          user_id: string
        }
        Update: {
          battle_id?: string
          created_at?: string
          id?: string
          round?: number
          side?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_votes_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battles: {
        Row: {
          artist_a_image: string | null
          artist_a_name: string
          artist_a_region: string | null
          artist_b_image: string | null
          artist_b_name: string
          artist_b_region: string | null
          co_hosts: string[] | null
          created_at: string
          created_by: string | null
          ended_at: string | null
          ended_time: string | null
          feed_post_id: string | null
          host_name: string
          host_user_id: string | null
          id: string
          launch_mode: string
          launched_at: string | null
          region: string
          room_id: string | null
          round: number
          scheduled_for: string | null
          scheduled_time: string | null
          song_a: string
          song_b: string
          status: string
          title: string
          total_rounds: number
          updated_at: string
          winner: string | null
        }
        Insert: {
          artist_a_image?: string | null
          artist_a_name: string
          artist_a_region?: string | null
          artist_b_image?: string | null
          artist_b_name: string
          artist_b_region?: string | null
          co_hosts?: string[] | null
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          ended_time?: string | null
          feed_post_id?: string | null
          host_name: string
          host_user_id?: string | null
          id?: string
          launch_mode?: string
          launched_at?: string | null
          region?: string
          room_id?: string | null
          round?: number
          scheduled_for?: string | null
          scheduled_time?: string | null
          song_a: string
          song_b: string
          status?: string
          title: string
          total_rounds?: number
          updated_at?: string
          winner?: string | null
        }
        Update: {
          artist_a_image?: string | null
          artist_a_name?: string
          artist_a_region?: string | null
          artist_b_image?: string | null
          artist_b_name?: string
          artist_b_region?: string | null
          co_hosts?: string[] | null
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          ended_time?: string | null
          feed_post_id?: string | null
          host_name?: string
          host_user_id?: string | null
          id?: string
          launch_mode?: string
          launched_at?: string | null
          region?: string
          room_id?: string | null
          round?: number
          scheduled_for?: string | null
          scheduled_time?: string | null
          song_a?: string
          song_b?: string
          status?: string
          title?: string
          total_rounds?: number
          updated_at?: string
          winner?: string | null
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          ai_reply_status: string
          created_at: string
          id: string
          is_read: boolean
          message_text: string
          needs_ai_review: boolean
          sender_type: string
          sender_user_id: string | null
          thread_id: string
        }
        Insert: {
          ai_reply_status?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message_text: string
          needs_ai_review?: boolean
          sender_type: string
          sender_user_id?: string | null
          thread_id: string
        }
        Update: {
          ai_reply_status?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message_text?: string
          needs_ai_review?: boolean
          sender_type?: string
          sender_user_id?: string | null
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "dm_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      dm_ai_jobs: {
        Row: {
          created_at: string
          id: string
          processed_at: string | null
          status: string
          thread_id: string
          user_message_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          processed_at?: string | null
          status?: string
          thread_id: string
          user_message_id: string
        }
        Update: {
          created_at?: string
          id?: string
          processed_at?: string | null
          status?: string
          thread_id?: string
          user_message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dm_ai_jobs_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "dm_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dm_ai_jobs_user_message_id_fkey"
            columns: ["user_message_id"]
            isOneToOne: false
            referencedRelation: "direct_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      dm_threads: {
        Row: {
          created_at: string
          id: string
          is_archived: boolean
          last_message_at: string | null
          last_message_preview: string | null
          title: string | null
          unread_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_archived?: boolean
          last_message_at?: string | null
          last_message_preview?: string | null
          title?: string | null
          unread_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_archived?: boolean
          last_message_at?: string | null
          last_message_preview?: string | null
          title?: string | null
          unread_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      liked_artists: {
        Row: {
          artist_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      liked_songs: {
        Row: {
          created_at: string
          id: string
          song_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          song_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          song_id?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string | null
          metadata: Json | null
          title: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string | null
          metadata?: Json | null
          title?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string | null
          metadata?: Json | null
          title?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      outbound_email_queue: {
        Row: {
          attempts: number
          body_text: string
          created_at: string
          event_type: string
          id: string
          payload: Json
          sent_at: string | null
          status: string
          subject: string
          to_email: string
        }
        Insert: {
          attempts?: number
          body_text: string
          created_at?: string
          event_type: string
          id?: string
          payload?: Json
          sent_at?: string | null
          status?: string
          subject: string
          to_email: string
        }
        Update: {
          attempts?: number
          body_text?: string
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json
          sent_at?: string | null
          status?: string
          subject?: string
          to_email?: string
        }
        Relationships: []
      }
      playlist_songs: {
        Row: {
          created_at: string
          id: string
          playlist_id: string | null
          position: number | null
          song_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          playlist_id?: string | null
          position?: number | null
          song_id: string
        }
        Update: {
          created_at?: string
          id?: string
          playlist_id?: string | null
          position?: number | null
          song_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
        ]
      }
      playlists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          mood: string | null
          name: string
          user_id: string
          vibe: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          mood?: string | null
          name: string
          user_id: string
          vibe?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          mood?: string | null
          name?: string
          user_id?: string
          vibe?: string | null
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      pulses: {
        Row: {
          created_at: string
          id: number
          song_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          song_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          song_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      room_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          reply_to_message_id: string | null
          room_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          reply_to_message_id?: string | null
          room_name?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          reply_to_message_id?: string | null
          room_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_messages_reply_to_message_id_fkey"
            columns: ["reply_to_message_id"]
            isOneToOne: false
            referencedRelation: "room_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      room_profiles: {
        Row: {
          avatar_url: string | null
          display_name: string | null
          is_active: boolean | null
          joined_at: string | null
          last_seen_at: string | null
          room_id: string
          room_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_seen_at?: string | null
          room_id: string
          room_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          display_name?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_seen_at?: string | null
          room_id?: string
          room_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          activity_type: string | null
          content: string | null
          created_at: string
          id: string
          is_deleted: boolean
          media_url: string | null
          metadata: Json
          playlist_id: string | null
          post_type: string
          song_id: string | null
          target_type: string | null
          text_content: string | null
          updated_at: string
          user_id: string
          visibility: string
        }
        Insert: {
          activity_type?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean
          media_url?: string | null
          metadata?: Json
          playlist_id?: string | null
          post_type?: string
          song_id?: string | null
          target_type?: string | null
          text_content?: string | null
          updated_at?: string
          user_id: string
          visibility?: string
        }
        Update: {
          activity_type?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_deleted?: boolean
          media_url?: string | null
          metadata?: Json
          playlist_id?: string | null
          post_type?: string
          song_id?: string | null
          target_type?: string | null
          text_content?: string | null
          updated_at?: string
          user_id?: string
          visibility?: string
        }
        Relationships: []
      }
      song_analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          song_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          song_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          song_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      suggestion_forms: {
        Row: {
          created_at: string
          email_sent: boolean
          id: string
          improvement_text: string
          source: string
          status: string
          subject: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_sent?: boolean
          id?: string
          improvement_text: string
          source?: string
          status?: string
          subject?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_sent?: boolean
          id?: string
          improvement_text?: string
          source?: string
          status?: string
          subject?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      audience_profiles_public: {
        Row: {
          avatar_url: string | null
          base_profile_link: string | null
          bio: string | null
          cover_photo_url: string | null
          cover_url: string | null
          created_at: string | null
          display_name: string | null
          id: string | null
          onboarding_completed: boolean | null
          profile_name: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          base_profile_link?: string | null
          bio?: string | null
          cover_photo_url?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
          onboarding_completed?: boolean | null
          profile_name?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          base_profile_link?: string | null
          bio?: string | null
          cover_photo_url?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
          onboarding_completed?: boolean | null
          profile_name?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      battle_listener_counts: {
        Row: {
          battle_id: string | null
          listener_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "battle_rooms_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_live_counts: {
        Row: {
          battle_id: string | null
          listener_count: number | null
          room_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "battle_rooms_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_live_users: {
        Row: {
          avatar_url: string | null
          battle_id: string | null
          display_name: string | null
          is_active: boolean | null
          joined_at: string | null
          last_seen_at: string | null
          mic_on: boolean | null
          role: string | null
          room_id: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "battle_rooms_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_vote_counts: {
        Row: {
          battle_id: string | null
          side: string | null
          vote_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "battle_votes_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_popularity: {
        Row: {
          avatar_url: string | null
          bio: string | null
          cover_photo_url: string | null
          created_at: string | null
          display_name: string | null
          follower_count: number | null
          location: string | null
          play_count: number | null
          popularity_score: number | null
          post_count: number | null
          user_id: string | null
          username: string | null
        }
        Relationships: []
      }
      room_live_counts: {
        Row: {
          listener_count: number | null
          room_id: string | null
        }
        Relationships: []
      }
      room_live_users: {
        Row: {
          avatar_url: string | null
          display_name: string | null
          is_active: boolean | null
          joined_at: string | null
          last_seen_at: string | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_seen_at?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          display_name?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_seen_at?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      song_like_counts: {
        Row: {
          likes_count: number | null
          song_id: string | null
        }
        Relationships: []
      }
      song_pulse_counts: {
        Row: {
          pulses_count: number | null
          song_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_songchainn_system_post: {
        Args: { _playlist_id?: string; _song_id?: string; _text: string }
        Returns: string
      }
      create_text_post: { Args: { _text: string }; Returns: string }
      ensure_dm_thread: { Args: { _user_id: string }; Returns: string }
      heartbeat_battle_room: {
        Args: { _battle_id: string }
        Returns: undefined
      }
      heartbeat_room: { Args: { _room_id: string }; Returns: undefined }
      join_battle_room: { Args: { _battle_id: string }; Returns: undefined }
      join_room: { Args: { _room_id: string }; Returns: undefined }
      launch_battle_now: { Args: { _battle_id: string }; Returns: string }
      leave_battle_room: { Args: { _battle_id: string }; Returns: undefined }
      leave_room: { Args: { _room_id: string }; Returns: undefined }
      mark_dm_thread_read: { Args: { _thread_id: string }; Returns: undefined }
      send_mosha_message: {
        Args: { _message_text: string; _user_id: string }
        Returns: string
      }
      switch_battle_room: {
        Args: { _new_battle_id: string }
        Returns: undefined
      }
      sync_battle_listener_count: {
        Args: { _battle_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
