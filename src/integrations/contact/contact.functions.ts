/**
 * Server function wrapper for the /contact form. Safe to import from client.
 */
import { createServerFn } from "@tanstack/react-start";
import { ContactSchema, submitContactForm } from "./contact.server";

export const submitContactFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    return submitContactForm(data);
  });
