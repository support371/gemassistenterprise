import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface NewsletterSubscriber {
  id: string;
  tenantId: string;
  email: string;
  subscribedAt: string;
}

export interface NewsletterCampaign {
  id: string;
  tenantId: string;
  subject: string;
  scheduledFor: string;
  status: 'scheduled' | 'dispatched' | 'failed';
  createdAt: string;
}

interface NewsletterSnapshot {
  subscribers: NewsletterSubscriber[];
  campaigns: NewsletterCampaign[];
}

const storePath = path.join(process.cwd(), 'data', 'newsletter.json');

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  try {
    await fs.access(storePath);
  } catch {
    const initial: NewsletterSnapshot = { subscribers: [], campaigns: [] };
    await fs.writeFile(storePath, JSON.stringify(initial, null, 2), 'utf8');
  }
}

async function readStore(): Promise<NewsletterSnapshot> {
  await ensureStore();
  const raw = await fs.readFile(storePath, 'utf8');
  try {
    const parsed = JSON.parse(raw) as NewsletterSnapshot;
    return {
      subscribers: parsed.subscribers ?? [],
      campaigns: parsed.campaigns ?? [],
    };
  } catch {
    return { subscribers: [], campaigns: [] };
  }
}

async function writeStore(snapshot: NewsletterSnapshot): Promise<void> {
  await fs.writeFile(storePath, JSON.stringify(snapshot, null, 2), 'utf8');
}

export async function upsertSubscriber(tenantId: string, email: string): Promise<NewsletterSubscriber> {
  const normalizedEmail = email.trim().toLowerCase();
  const snapshot = await readStore();
  const existing = snapshot.subscribers.find(
    (subscriber) => subscriber.tenantId === tenantId && subscriber.email === normalizedEmail,
  );

  if (existing) {
    return existing;
  }

  const subscriber: NewsletterSubscriber = {
    id: crypto.randomUUID(),
    tenantId,
    email: normalizedEmail,
    subscribedAt: new Date().toISOString(),
  };
  snapshot.subscribers.unshift(subscriber);
  await writeStore(snapshot);
  return subscriber;
}

export async function listSubscribers(tenantId: string): Promise<NewsletterSubscriber[]> {
  const snapshot = await readStore();
  return snapshot.subscribers.filter((subscriber) => subscriber.tenantId === tenantId);
}

export async function scheduleCampaign(
  tenantId: string,
  subject: string,
  scheduledFor: string,
): Promise<NewsletterCampaign> {
  const snapshot = await readStore();
  const campaign: NewsletterCampaign = {
    id: crypto.randomUUID(),
    tenantId,
    subject,
    scheduledFor,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  };
  snapshot.campaigns.unshift(campaign);
  await writeStore(snapshot);
  return campaign;
}

export async function listCampaigns(tenantId: string): Promise<NewsletterCampaign[]> {
  const snapshot = await readStore();
  return snapshot.campaigns.filter((campaign) => campaign.tenantId === tenantId);
}
