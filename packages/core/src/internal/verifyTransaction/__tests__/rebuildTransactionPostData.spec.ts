import {rebuildTransactionPostData} from '../rebuildTransactionPostData';

describe('rebuildTransactionPostData', () => {
    describe('sendMoney', () => {
        const requestType = 'sendMoney'
        it('should rebuild data correctly - simple', () => {
            const transactionBytes = '00204209750f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff64100032baf5bd38b58b3354797698cdf6b7e6'
            const rebuiltData = {
                recipient: '16107620026796983538',
                amountNQT: '1234567',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
        // TODO here check attachments from flags
        // it('should rebuild data correctly - with message (text)', () => {
        // })
        // it('should rebuild data correctly - with message (binary)', () => {
        // })
        // it('should rebuild data correctly - with encrypted message', () => {
        // })
        // it('should rebuild data correctly - with note to self', () => {
        // })
    })
    describe('sendMoneyMulti', () => {
        const requestType = 'sendMoneyMulti'
        it('should rebuild data correctly - 2 recipients', () => {
            const transactionBytes = '0021210f750fa00539101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e00000000000000004e61bc000000000041420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000565100060f839522d41709b54797698cdf6b7e60102f2c4339212c389df0061bc000000000060896b7b500188574e00000000000000'
            const rebuiltData = {
                recipients: '16107620026796983538:12345600;6307292723312036192:78',
                feeNQT: '1000001',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 1440
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
        it('should rebuild data correctly - 20 recipients', () => {
            const transactionBytes = '0021094d780f3d0018f6f49edb73a5528ee0b12a0f907db1a3baf98f9a4b9bf9e62710a79cc04e2d0000000000000000bd5ae93b0300000080841e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007d6810001182287a8e70ea8754797698cdf6b7e6011488b2f9c1ec657d8ec8d8614a000000006cbdf1bc1a1681e5783ea932020000007c4e85f6db0ffba82f172347000000007e78dd7272cd28113485e63b00000000ed60d1d94ccaae5857a6d43b00000000060000000000000006000000000000000700000000000000070000000000000008000000000000000800000000000000090000000000000009000000000000000a000000000000000a000000000000000b000000000000000b000000000000000c000000000000000c000000000000000d000000000000000d000000000000000e000000000000000e000000000000000f000000000000000f000000000000001000000000000000100000000000000011000000000000001100000000000000120000000000000012000000000000001300000000000000130000000000000014000000000000001400000000000000'
            const rebuiltData = {
                recipients: '10267474793015653000:1247926472;16537523610776092012:9439886968;12176343454934453884:1193482031;1236463989150283902:1004963124;6390267352706015469:1003791959;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20',
                feeNQT: '2000000',
                publicKey: '18f6f49edb73a5528ee0b12a0f907db1a3baf98f9a4b9bf9e62710a79cc04e2d',
                deadline: 61
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
    })
    describe('sendMoneyMultiSame', () => {
        const requestType = 'sendMoneyMultiSame'
        it('should rebuild data correctly - 2 recipients', () => {
            const transactionBytes = '0022dc04790f01008c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b530000000000000000c01f630d000000004a420f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040691000231aa75fc0289f1154797698cdf6b7e60102cd610c3c0f84456196f4f9ae9879de80'
            const rebuiltData = {
                recipients: '7009153596038865357;9285993178362147990',
                amountNQT: '112300000',
                feeNQT: '1000010',
                publicKey: '8c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b53',
                deadline: 1
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
        it('should rebuild data correctly - 128 recipients', () => {
            const transactionBytes = '00224809790f7b008c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b5300000000000000008098ad5500000000808d5b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044691000368edba733a74bc754797698cdf6b7e60180c8fe6f1f0000000062261f1200000000013dc67100000000f407321b000000005995f50a00000000b964fc8600000000aa12ad8300000000692677fd000000005ef93563000000001a90e0d2000000000df007ae000000007205693000000000f7afcd380000000015dddeb700000000503a100a000000007a5f79680000000046cfe7ea00000000f7e079600000000011c713de00000000f3f5eff3000000003881994700000000fc9cc63900000000ac5f3183000000009bb6118600000000cb00d25200000000e30054da00000000d916b6dd00000000e26f8414000000009c51e7d9000000002c8ad7a4000000001e20d4520000000095688592000000009a3d7ec5000000001f412ed10000000030f182de000000002df33e4c0000000057a51498000000003b685ee2000000003d921dad00000000c509df0b00000000831422b200000000f07cbb430000000074e6f30000000000e098fa7500000000f38127d000000000eedc5624000000003aabc4b400000000c158b05a0000000048aee501000000004d529a5e00000000aec1373e00000000e07fdb56000000000c315f8d00000000ee4c976200000000c7467f4100000000087960d100000000346fac4c00000000e4c11f7100000000af215da2000000004e59d91d000000005ad8010d0000000012ef7be50000000097f2d775000000002f774fd900000000de5b04870000000059a02479000000000b75470900000000d907f8d500000000b878536c0000000027ba28bc000000004c7cc99c00000000a566009300000000306d18e300000000933e3f4800000000aa77587400000000a00d5a0900000000a10bdea900000000fc509e49000000000ada16a100000000b361fac80000000026bf0b910000000015dd7f2300000000158dd816000000009d9a19b100000000a1519ff600000000c2ec9df400000000aa0ac25a00000000fbf6514f00000000b0d44db8000000003b389f1f00000000594e606100000000a2cbf1e3000000003e4ee2340000000056bd6c0700000000c18f3ad500000000b7b046fc00000000a221551200000000ca96ee5c00000000da385671000000006e93e35000000000952fe4b900000000162a75be000000009e2b75cd0000000059f36810000000005cde2a8b000000008c263e1b00000000bb08e4960000000060872f5200000000311e624600000000f7f7773b00000000d60282f000000000fe322fbb00000000a57cb5da000000001f006c140000000002a0b0a900000000e75f0c21000000008d42f70500000000597d2d71000000006aa068150000000049c76703000000007e67028e00000000de70aa6a0000000036c3d53600000000fd4459ed000000002f6ada160000000056017b3200000000555bba7d00000000a03debe200000000'
            const rebuiltData = {
                recipients: '527433416;304031330;1908817153;456263668;183866713;2264687801;2209157802;4252444265;1664481630;3537932314;2919755789;812189042;953004023;3084836117;168835664;1752784762;3941060422;1618600183;3725838097;4092589555;1201242424;969317628;2201051052;2249307803;1389494475;3662938339;3719698137;344223714;3655815580;2765589036;1389633566;2458216597;3313384858;3509469471;3733123376;1279193901;2551489879;3797837883;2904396349;199166405;2988577923;1136360688;15984244;1979357408;3492250099;609672430;3032787770;1521506497;31829576;1587171917;1043841454;1457225696;2371825932;1654082798;1098860231;3512760584;1286369076;1897906660;2724012463;500783438;218224730;3850104594;1977086615;3645863727;2265209822;2032443481;155677963;3589801945;1817409720;3156785703;2630450252;2466277029;3810028848;1212104339;1951954858;156896672;2849901473;1235112188;2702629386;3371852211;2433466150;595582229;383290645;2971245213;4137636257;4103990466;1522666154;1330771707;3092108464;530528315;1633701465;3824274338;887246398;124566870;3577384897;4232491191;307569058;1559140042;1901476058;1357091694;3118739349;3195349526;3447008158;275313497;2334842460;457057932;2531526843;1378846560;1180835377;997718007;4035052246;3140432638;3669327013;342622239;2846924802;554459111;100090509;1898806617;359178346;57132873;2382522238;1789554910;919978806;3982050557;383412783;846922070;2109365077;3807067552',
                amountNQT: '11230001',
                feeNQT: '6000000',
                publicKey: '8c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b53',
                deadline: 123
            }
            const output = rebuildTransactionPostData(transactionBytes)
            expect(output.requestType).toEqual(requestType)
            expect(output.rebuiltData).toEqual(rebuiltData)
        })
    })
})
