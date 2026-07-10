import { useQuery } from '@tanstack/react-query';
import { loadPortalSnapshot, type PortalDataState } from './portalData';

// loadPortalSnapshot() never throws — apiGetOrMock catches API failures and
// resolves with the mock snapshot instead, so this query always succeeds
// and `source` carries whether the data is live or mock.
export function usePortalSnapshot() {
  return useQuery<PortalDataState>({
    queryKey: ['portal-snapshot'],
    queryFn: loadPortalSnapshot
  });
}
