import type { DataSource } from './client';
import { portalSnapshot, type PortalSnapshot } from '../data/mockPortalData';

export interface PortalDataState {
  snapshot: PortalSnapshot;
  source: DataSource;
  error?: string;
}

export async function loadPortalSnapshot(): Promise<PortalDataState> {
  return { snapshot: portalSnapshot, source: 'mock' };
}
