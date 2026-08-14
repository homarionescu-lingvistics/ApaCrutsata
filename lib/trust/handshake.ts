import { randomInt } from "crypto";

export type Handshake = {
  id: string;
  listing_id: string;
  owner_id: string;
  code: string;
  partner_id: string | null;
  owner_confirmed_at: string | null;
  partner_confirmed_at: string | null;
  confirmed_at: string | null;
  created_at: string;
};

export function newHandshakeCode() {
  return String(randomInt(100000, 999999));
}

export function isHandshakeComplete(h: Handshake) {
  return Boolean(h.owner_confirmed_at && h.partner_confirmed_at);
}
