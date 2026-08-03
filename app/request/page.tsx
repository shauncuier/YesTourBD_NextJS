import type { Metadata } from "next";
import { RequestScreen } from "@/components/screens/RequestScreen.jsx";
import { submitQuoteRequest } from "./actions";

export const metadata: Metadata = {
  title: "Request a quote — YesTourBD",
  description:
    "Corporate tours, group tours, events, visa assistance and custom packages. Tell us the trip and a coordinator replies within two working hours.",
};

export default function Page() {
  return <RequestScreen action={submitQuoteRequest} />;
}
