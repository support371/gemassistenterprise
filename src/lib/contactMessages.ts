import { promises as fs } from 'node:fs';
import path from 'node:path';

export type MessageStatus = 'open' | 'triaged' | 'closed';

export interface ContactMessage {
  id: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  sourcePage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  messageBody: string;
  status: MessageStatus;
  assignedToUserId: string | null;
  orgId: string | null;
  tags: string[];
}

interface ListFilters {
  tenantId?: string;
  q?: string;
  status?: MessageStatus;
  assignedToUserId?: string;
}

const dataPath = path.join(process.cwd(), 'data', 'contact-messages.json');

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });

  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, '[]', 'utf8');
  }
}

async function readMessages(): Promise<ContactMessage[]> {
  await ensureStore();
  const raw = await fs.readFile(dataPath, 'utf8');

  try {
    const parsed = JSON.parse(raw) as Partial<ContactMessage>[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((message) => {
      const createdAt = typeof message.createdAt === 'string' ? message.createdAt : new Date().toISOString();
      return {
        id: message.id ?? crypto.randomUUID(),
        tenantId: message.tenantId ?? 'tenant-default',
        createdAt,
        updatedAt: typeof message.updatedAt === 'string' ? message.updatedAt : createdAt,
        sourcePage: message.sourcePage ?? '/contact-us',
        firstName: message.firstName ?? 'Unknown',
        lastName: message.lastName ?? '',
        email: message.email ?? '',
        phone: message.phone ?? '',
        serviceInterest: message.serviceInterest ?? '',
        messageBody: message.messageBody ?? '',
        status: message.status === 'triaged' || message.status === 'closed' ? message.status : 'open',
        assignedToUserId: message.assignedToUserId ?? null,
        orgId: message.orgId ?? null,
        tags: Array.isArray(message.tags) ? message.tags : [],
      };
    });
  } catch {
    return [];
  }
}

async function writeMessages(messages: ContactMessage[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(messages, null, 2), 'utf8');
}

export async function createContactMessage(
  input: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'assignedToUserId' | 'orgId' | 'tags'>,
): Promise<ContactMessage> {
  const messages = await readMessages();
  const timestamp = new Date().toISOString();

  const record: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
    status: 'open',
    assignedToUserId: null,
    orgId: null,
    tags: [],
    ...input,
  };

  messages.unshift(record);
  await writeMessages(messages);

  return record;
}

export async function listContactMessages(filters: ListFilters = {}): Promise<ContactMessage[]> {
  const messages = await readMessages();
  const query = filters.q?.trim().toLowerCase();

  return messages.filter((message) => {
    if (filters.tenantId && message.tenantId !== filters.tenantId) {
      return false;
    }

    if (filters.status && message.status !== filters.status) {
      return false;
    }

    if (filters.assignedToUserId && message.assignedToUserId !== filters.assignedToUserId) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      message.firstName,
      message.lastName,
      message.email,
      message.phone,
      message.serviceInterest,
      message.messageBody,
      message.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}

export async function updateContactMessage(
  id: string,
  updates: Partial<Pick<ContactMessage, 'status' | 'assignedToUserId' | 'orgId' | 'tags'>>,
): Promise<ContactMessage | null> {
  const messages = await readMessages();
  const index = messages.findIndex((message) => message.id === id);

  if (index === -1) {
    return null;
  }

  const current = messages[index];

  messages[index] = {
    ...current,
    ...updates,
    tags: updates.tags ?? current.tags,
    updatedAt: new Date().toISOString(),
  };

  await writeMessages(messages);
  return messages[index];
}

export function toCsv(messages: ContactMessage[]): string {
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const header = [
    'id',
    'tenantId',
    'createdAt',
    'updatedAt',
    'sourcePage',
    'firstName',
    'lastName',
    'email',
    'phone',
    'serviceInterest',
    'status',
    'assignedToUserId',
    'orgId',
    'tags',
    'messageBody',
  ];

  const rows = messages.map((message) =>
    [
      message.id,
      message.tenantId,
      message.createdAt,
      message.updatedAt,
      message.sourcePage,
      message.firstName,
      message.lastName,
      message.email,
      message.phone,
      message.serviceInterest,
      message.status,
      message.assignedToUserId ?? '',
      message.orgId ?? '',
      message.tags.join('|'),
      message.messageBody,
    ]
      .map((field) => escape(field))
      .join(','),
  );

  return [header.join(','), ...rows].join('\n');
}
