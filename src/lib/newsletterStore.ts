import { prisma } from './prisma';

export async function addSubscriber(sub: { email: string; locale?: string; source: 'footer'|'consultation'|'pricing'; privacyVersion?: string }) {
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: sub.email } });
  if (existing) {
    // Merge sources maintaining original order + uniqueness
    const currentSources = (existing.sources || '').split(',').filter(Boolean);
    if (!currentSources.includes(sub.source)) currentSources.push(sub.source);

    const updateData: {
      sources: string;
      locale: string | null | undefined;
      unsubscribedAt?: Date | null;
      consentAt?: Date;
      privacyVersion?: string;
    } = {
      sources: currentSources.join(','),
      // preserve existing locale unless we don't have one stored yet
      locale: existing.locale ?? sub.locale,
    };

    // If previously unsubscribed, reactivate
    if (existing.unsubscribedAt) {
      updateData.unsubscribedAt = null;
      updateData.consentAt = new Date();
    }
    // Update privacyVersion if a new one provided (e.g., policy updated or first subscription after unsubscribe)
    if (sub.privacyVersion) {
      updateData.privacyVersion = sub.privacyVersion;
    }

    return prisma.newsletterSubscriber.update({
      where: { email: sub.email },
      data: updateData
    });
  }
  return prisma.newsletterSubscriber.create({
    data: {
      email: sub.email,
      locale: sub.locale,
      sources: sub.source,
      privacyVersion: sub.privacyVersion,
    }
  });
}

export async function listSubscribers() {
  return prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
}
