import {loadEnvironment} from './helpers/environment';
import {ChainService} from '../../../service/chainService';
import {getBlockchainStatus, getMiningInfo, getServerStatus, getTime, getSuggestedFees} from '../../factories/network';
import {FeeQuantPlanck} from '@signumjs/util';

const environment = loadEnvironment();

vi.setTimeout(environment.timeout);

describe('[E2E] Network Api', () => {

    const service = new ChainService({
        nodeHost: environment.testNetHost,
        apiRootUrl: environment.testNetApiPath
    });

    it('should getBlockchainStatus', async () => {
        const status = await getBlockchainStatus(service)();
        expect(status.application).toBe('BRS');
        expect(status.numberOfBlocks).toBeGreaterThan(1);
    });

    it('should getMiningInfo', async () => {
        const status = await getMiningInfo(service)();
        expect(parseInt(status.height, 10)).toBeGreaterThan(350000);
    });

    it('should getServerStatus', async () => {
        const status = await getServerStatus(service)();
        expect(status.application).toBe('BRS');
        expect(status.numberOfBlocks).toBeGreaterThan(1);
        expect(status.numberOfPeers).toBeGreaterThan(1);
    });

    it('should getTime', async () => {
        const status = await getTime(service)();
        expect(status.time).toBeGreaterThan(0);
    });

    it('should suggestFee', async () => {
        const status = await getSuggestedFees(service)();
        expect(status.minimum).toBe(FeeQuantPlanck);
        expect(status.cheap).toBeGreaterThanOrEqual(FeeQuantPlanck);
        expect(status.standard).toBeGreaterThanOrEqual(FeeQuantPlanck);
        expect(status.priority).toBeGreaterThanOrEqual(FeeQuantPlanck);
    });

});
