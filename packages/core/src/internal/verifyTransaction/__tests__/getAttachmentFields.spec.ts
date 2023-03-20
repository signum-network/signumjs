import {getAttachmentFields} from '../getAttachmentFields';

describe('getAttachmentFields', function () {
    it('should return an existing spec', () => {
        const spec = getAttachmentFields(1, 'setAlias');
        expect(spec).toEqual([{type: 'ByteString*1', parameterName: 'aliasName'},
            {type: 'ShortString*1', parameterName: 'aliasURI'}]);
    });
    it('should throw on non-existing version', () => {

        expect(() => getAttachmentFields(99, 'foo')).toThrow('No attachment specification not found version');
    });
    it('should throw on non-existing method', () => {
        expect(() => getAttachmentFields(2, 'setTLD')).toThrow('Attachment specification not found for transaction type ');
    });
});
