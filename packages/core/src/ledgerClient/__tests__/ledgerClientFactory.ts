import {LedgerClientFactory} from '../ledgerClientFactory';

describe('LedgerClientFactory', () => {

    it('should create the ledger client', async () => {
        const ledger = LedgerClientFactory.createClient({
            nodeHost: 'nodehost',
            reliableNodeHosts: ['node1', 'node2']
        });

        expect(ledger.block).toBeDefined();
        expect(ledger.account).toBeDefined();
        expect(ledger.transaction).toBeDefined();
        expect(ledger.service.settings.httpClient).toBeDefined();
        expect(ledger.service.settings.apiRootUrl).toBe('/burst');
        expect(ledger.service.settings.nodeHost).toBe('nodehost');
        expect(ledger.service.settings.reliableNodeHosts).toEqual(['node1', 'node2']);

    });

});
