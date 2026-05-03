/**
 * Shared (client-safe) schema for the /contact form.
 * Pure Zod — no server-only deps. Safe to import from routes/components.
 */
import { z } from "zod";

const SharedFields = {
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  message: z.string().max(4000).optional().default(""),
  consent: z.literal(true),
  property: z.string().max(200).optional().default(""),
  community: z.string().max(200).optional().default(""),
};

const RealtorSchema = z.object({
  audience: z.literal("realtor"),
  ...SharedFields,
  brokerage: z.string().min(1).max(200),
  buyerArea: z.enum([
    "Port St. Lucie",
    "Fort Pierce",
    "Okeechobee County",
    "Other",
    "Buyer is exploring",
  ]),
  buyerTimeline: z.enum(["Ready now", "30 days", "60-90 days", "Just exploring"]),
});

const BuyerSchema = z.object({
  audience: z.literal("buyer"),
  ...SharedFields,
  preferredCommunity: z.enum([
    "Waterstone",
    "Bayshore",
    "Gatlin",
    "Indian River Estates",
    "Torino & St. James",
    "Okeechobee",
    "Not sure",
  ]),
  budget: z.enum(["Under $300k", "$300-400k", "$400-500k", "$500k+"]),
  moveInTimeline: z.enum(["ASAP", "3 months", "6 months", "Just researching"]),
});

export const ContactSchema = z.discriminatedUnion("audience", [
  RealtorSchema,
  BuyerSchema,
]);

export type ContactInput = z.infer<typeof ContactSchema>;
