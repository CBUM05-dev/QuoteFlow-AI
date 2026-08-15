import { RfqDetailClient } from "@/components/rfq/RfqDetailClient";

export default async function InboxDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ autoplay?: string }>;
}) {
  const { id } = await params;
  const { autoplay } = await searchParams;
  return <RfqDetailClient key={id} id={id} autoplay={autoplay === "1"} />;
}
