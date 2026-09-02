import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_TABLE,
  SUPABASE_ROW_ID,
  IMG_BUCKET,
  supabaseConfigured,
} from "../config.js";

let client = null;

function sb() {
  if (!client && supabaseConfigured()) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return client;
}

export async function fetchRemoteData() {
  if (!supabaseConfigured()) return null;
  const { data, error } = await sb()
    .from(SUPABASE_TABLE)
    .select("payload")
    .eq("id", SUPABASE_ROW_ID)
    .maybeSingle();
  if (error || !data) return null;
  return data.payload;
}

export async function pushRemoteData(payload) {
  if (!supabaseConfigured()) return;
  const { error } = await sb()
    .from(SUPABASE_TABLE)
    .upsert(
      { id: SUPABASE_ROW_ID, payload, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );
  if (error) throw error;
}

export function subscribeRealtime(cb) {
  if (!supabaseConfigured()) return () => {};
  const channel = sb()
    .channel("portfolio-data")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: SUPABASE_TABLE },
      (payload) => {
        if (payload.new && payload.new.payload) cb(payload.new.payload);
      }
    )
    .subscribe();
  return () => {
    sb().removeChannel(channel);
  };
}

export async function signIn(email, password) {
  if (!supabaseConfigured()) return { error: { message: "backend not configured" } };
  return sb().auth.signInWithPassword({ email, password });
}

export async function signOut() {
  if (!supabaseConfigured()) return;
  await sb().auth.signOut();
}

export async function isSignedIn() {
  if (!supabaseConfigured()) return false;
  const {
    data: { session },
  } = await sb().auth.getSession();
  return Boolean(session);
}

export async function uploadImage(file) {
  if (!supabaseConfigured()) {
    return { url: null, error: "База не настроена" };
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { data, error } = await sb()
    .storage.from(IMG_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { url: null, error: error.message };
  const url = `${SUPABASE_URL}/storage/v1/object/public/${IMG_BUCKET}/${data.path}`;
  return { url, error: null };
}