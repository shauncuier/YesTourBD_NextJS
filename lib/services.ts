import { prisma } from './db';

/// The shape the screens have always consumed (lib/site-data.js), so the database can feed
/// the existing components without touching their markup.
export type ServiceTile = {
  id: string;
  icon: string;
  label: string;
  mode: 'instant' | 'request';
  blurb: string;
};

/** The active service catalogue, in the order the brief lists it. */
export async function getServices(): Promise<ServiceTile[]> {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { sort: 'asc' },
  });

  return services.map((service) => ({
    id: service.slug,
    icon: service.icon,
    label: service.name,
    mode: service.mode,
    blurb: service.summary,
  }));
}
