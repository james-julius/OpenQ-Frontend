/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '../../../test-utils';
import TokenList from '../../../components/FundBounty/SearchTokens/TokenList';

beforeEach(() => {
  const observe = jest.fn();
  const disconnect = jest.fn();
  window.IntersectionObserver = jest.fn(() => ({
    observe,
    disconnect,
  }));
});
describe('TokenList', () => {
  it('should display the TokenList interface', async () => {
    // ARRANGE
    const openqDefaultTokens = [
      {
        name: 'Matic',
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'MATIC',
        decimals: 18,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/matic.svg',
      },
      {
        name: 'Chainlink Token',
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        symbol: 'LINK',
        decimals: 18,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/link.svg',
      },
      {
        name: 'Dummy ERC20',
        address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        symbol: 'DERC20',
        decimals: 18,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/dai.svg',
      },
      {
        name: 'Dummy ERC20 (Blacklisted)',
        address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
        symbol: 'BDERC20',
        decimals: 18,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/dai.svg',
      },
      {
        name: 'Wrapped Matic',
        address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
        symbol: 'WMATIC',
        decimals: 18,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/matic.svg',
      },
      {
        name: 'Dai Stablecoin',
        address: '0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1',
        symbol: 'DAI',
        decimals: 18,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/dai.svg',
      },
      {
        name: 'Tether USD',
        address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        symbol: 'USDT',
        decimals: 6,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/usdt.svg',
      },
      {
        name: 'Wrapped Ether',
        address: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
        symbol: 'WETH',
        decimals: 18,
        chainId: 80001,
        path: 'https://wallet-asset.matic.network/img/tokens/eth.svg',
      },
    ];
    const polygonDefaultTokens = [
      {
        chainId: 137,
        name: 'GoBlank Token',
        symbol: 'BLANK',
        decimals: 18,
        address: '0xf4C83080E80AE530d6f8180572cBbf1Ac9D5d435',
        logoURI:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x41A3Dba3D677E573636BA691a70ff2D606c29666/logo.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x41A3Dba3D677E573636BA691a70ff2D606c29666' },
      },
      {
        chainId: 137,
        name: 'Cryptopia Token',
        symbol: 'CRT',
        decimals: 18,
        address: '0x7348565F0A5077252D310392C3CeCD8dB87a7704',
        logoURI: 'https://cryptopia.com/images/icons/icon_CRT.png',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xABdD22dFE5Db2be20262050523470B650E91F246' },
      },
      {
        chainId: 137,
        name: 'BTU Protocol',
        symbol: 'BTU',
        decimals: 18,
        address: '0xfdc26cda2d2440d0e83cd1dee8e8be48405806dc',
        logoURI: 'https://btu-protocol.com/images/log-BTU-256w.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xb683D83a532e2Cb7DFa5275eED3698436371cc9f' },
      },
      {
        chainId: 137,
        name: 'Trips',
        symbol: 'TRIPS',
        decimals: 18,
        address: '0x77F0F7d657f362C4b703417B800B83B989a288a2',
        logoURI:
          'https://gateway.pinata.cloud/ipfs/QmVxZCAvxab8bUhaScwqw6NWABmqz4jmjJ3qnYUbdKweEf/trips_T_logo256x256.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x1350fbe8ce27762ec19134bf8fc405a427fe9bf1' },
      },
      {
        chainId: 137,
        name: '0xMonero',
        symbol: '0xMR',
        decimals: 18,
        address: '0x52ede6bba83b7b4ba1d738df0df713d6a2036b71',
        logoURI: 'https://avatars.githubusercontent.com/u/65775032?v=4',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x035df12e0f3ac6671126525f1015e47d79dfeddf' },
      },
      {
        chainId: 137,
        name: 'Ispolink',
        symbol: 'ISP',
        decimals: 18,
        address: '0x1e289178612f5b6d32f692e312dcf783c74b2162',
        logoURI:
          'https://raw.githubusercontent.com/mikyjo/crypto_assets/main/tokens/ispolink/ispolink_icon_white_400x400.jpg',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xc8807f0f5ba3fa45ffbdc66928d71c5289249014' },
      },
      {
        chainId: 137,
        name: 'Gistcoin',
        symbol: 'GIST',
        decimals: 18,
        address: '0xF6db73D0495Fe4648d494046cCbdc5625F2740F0',
        logoURI: 'https://etherscan.io/token/images/gistcoin_32.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x6cd775540cce9adb01872db9f794142f53595c71' },
      },
      {
        chainId: 137,
        name: 'Orbs Token',
        symbol: 'ORBS',
        decimals: 18,
        address: '0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff',
        logoURI: 'https://raw.githubusercontent.com/orbs-network/graphical-assets/main/orbs/ethereum/token/logo256.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xff56Cc6b1E6dEd347aA0B7676C85AB0B3D08B0FA' },
      },
      {
        chainId: 137,
        name: 'InsurAce',
        symbol: 'INSUR',
        decimals: 18,
        address: '0x8a0e8b4b0903929f47C3ea30973940D4a9702067',
        logoURI: 'https://app.insurace.io/asset/token/insur.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x544c42fBB96B39B21DF61cf322b5EDC285EE7429' },
      },
      {
        chainId: 137,
        name: 'MASQ',
        symbol: 'MASQ',
        decimals: 18,
        address: '0xee9a352f6aac4af1a5b9f467f6a93e0ffbe9dd35',
        logoURI: 'https://github.com/MASQ-Project/MASQ-contract/raw/master/MASQ%20Logo%20Blue%20Solo%20Transparent.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x06F3C323f0238c72BF35011071f2b5B7F43A054c' },
      },
      {
        chainId: 137,
        name: 'Voltage',
        symbol: 'VOLT',
        decimals: 18,
        address: '0xe8a05e85883f9663b18a38d7aa89853deaba56e3',
        logoURI: 'https://assets.coingecko.com/coins/images/18515/small/volt.png?1632219924',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xffbf315f70e458e49229654dea4ce192d26f9b25' },
      },
      {
        chainId: 137,
        name: 'Pinjour',
        symbol: 'PIN',
        decimals: 18,
        address: '0x1d5278cbd93ff50260fddc93282e2e67ca3317c9',
        logoURI: 'https://d26jz7p3kula4l.cloudfront.net/static/img/pinjour-192x192.png',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x76c9a9583bda3ac6440fc153c7ffd89f99823a2c' },
      },
      {
        chainId: 137,
        name: 'Candle',
        symbol: 'CNDL',
        decimals: 18,
        address: '0x5423063af146F5abF88Eb490486E6B53FA135eC9',
        logoURI: 'https://i.ibb.co/86yLQRZ/candlelogo.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xbc138bD20C98186CC0342C8e380953aF0cb48BA8' },
      },
      {
        chainId: 137,
        name: 'Tower Token',
        symbol: 'TOWER',
        decimals: 18,
        address: '0x2bC07124D8dAc638E290f401046Ad584546BC47b',
        logoURI: 'https://crazydefenseheroes.com/static/media/logo-tower.2bca4bdd.svg',
        tags: ['pos', 'erc20', 'customWithdrawEventSig', 'swapable'],
        extensions: {
          rootAddress: '0x1C9922314ED1415c95b9FD453c3818fd41867d0B',
          withdrawEventSig: '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5',
        },
      },
      {
        chainId: 137,
        name: 'Meeds',
        symbol: 'MEED',
        decimals: 18,
        address: '0x6aca77cf3bab0c4e8210a09b57b07854a995289a',
        logoURI: 'https://github.com/Meeds-io/.github/raw/main/profile/meeds-256x256.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x8503a7b00b4b52692cc6c14e5b96f142e30547b7' },
      },
      {
        chainId: 137,
        name: 'inSure DeFi',
        symbol: 'SURE',
        decimals: 18,
        address: '0xF88332547c680F755481Bf489D890426248BB275',
        logoURI: 'https://insuretoken.net/images/logo-grey-circle.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xcb86c6a22cb56b6cf40cafedb06ba0df188a416e' },
      },
      {
        chainId: 137,
        name: 'Beverage Token',
        symbol: 'DRINK',
        decimals: 18,
        address: '0x366a39a2f73de32df17cc9bdd027aa054f6ba9cb',
        logoURI:
          'https://raw.githubusercontent.com/Beverage-Finance/beverage-docs/main/assets/beverage-token-logos/beverage-200X200.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x9257fb8fab616867cEe67C3289547403617B1938' },
      },
      {
        chainId: 137,
        name: 'Wrapped CHI',
        symbol: 'WCHI',
        decimals: 8,
        address: '0xE79feAAA457ad7899357E8E2065a3267aC9eE601',
        logoURI: 'https://arweave.net/cLtOpcOcgshTnA3aWe8a1lKRG0baZHfWGsi1mq5Cgt4',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x6DC02164d75651758aC74435806093E421b64605' },
      },
      {
        chainId: 137,
        name: 'Indorse',
        symbol: 'IND',
        decimals: 18,
        address: '0x9611452965b63cFeA2C9774e5386AB6D4F0abf16',
        logoURI: 'https://drive.google.com/file/d/1Wbw4t_hibR5zMBdrLysvhfJvSIe34q9N/view?usp=sharing',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xf8e386EDa857484f5a12e4B5DAa9984E06E73705' },
      },
      {
        chainId: 137,
        name: 'Germoney',
        symbol: 'GER',
        decimals: 2,
        address: '0x03a68f78107d102d26353e5476733b067950bab6',
        logoURI: 'https://www.germoney.cash/static/media/logo.7c3abfc4.png',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x844Af22fBEC4D1bb9C062F33D29e4Ad8d0EFc01D' },
      },
      {
        chainId: 137,
        name: 'ScaleSwapToken',
        symbol: 'SCA',
        decimals: 18,
        address: '0x11a819Beb0AA3327E39f52F90d65Cc9bCA499F33',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x1FbD3dF007eB8A7477A1Eab2c63483dCc24EfFD6' },
        logoURI: 'https://wallet-asset.matic.network/img/tokens/sca.svg',
      },
      {
        chainId: 137,
        name: 'Megaverse',
        symbol: 'MEGA',
        decimals: 18,
        address: '0xD87958D9Cc146aBe382Ee20D1EF278321E61ADe9',
        logoURI: 'https://i.imgur.com/1pDWnjT.jpeg',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xCF9b27399447f92462Dad69491edbA304a063591' },
      },
      {
        chainId: 137,
        name: 'RocketX',
        symbol: 'RVF',
        decimals: 18,
        address: '0x2ce13e4199443fdfff531abb30c9b6594446bbc7',
        logoURI: 'https://drive.google.com/file/d/106QzWJ-42p2FVsgZQ4pVCw_cTTAudU39/view?usp=sharing',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xdc8af07a7861bedd104b8093ae3e9376fc8596d2' },
      },
      {
        chainId: 137,
        name: 'Forest Knight',
        symbol: 'KNIGHT',
        decimals: 18,
        address: '0x4455eF8B4B4A007a93DaA12DE63a47EEAC700D9D',
        logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11324.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x4455eF8B4B4A007a93DaA12DE63a47EEAC700D9D' },
      },
      {
        chainId: 137,
        name: 'Lepasa',
        symbol: 'LEPA',
        decimals: 18,
        address: '0xF9a4BBAa7fA1DD2352F1A47d6d3fcfF259A6D05F',
        logoURI: 'https://www.lepasa.com/assets/img/logo_256.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xbBa6C7c7d673c48d90069ad2e9d2fE587fcB6bc3' },
      },
      {
        chainId: 137,
        name: 'Civilization',
        symbol: 'CIV',
        decimals: 18,
        address: '0x42F6bdCfd82547e89F1069Bf375aa60e6c6c063d',
        logoURI: 'https://app.civfund.org/CIV_logo_txt_192x192.png',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x37fE0f067FA808fFBDd12891C0858532CFE7361d' },
      },
      {
        chainId: 137,
        name: 'Move',
        symbol: 'MOVE',
        decimals: 18,
        address: '0x521CddC0CBa84F14c69C1E99249F781AA73Ee0BC',
        logoURI: 'https://assets.coingecko.com/coins/images/13719/small/o0KIvs7T_400x400.jpg?1617672818',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x3fa729b4548becbad4eab6ef18413470e6d5324c' },
      },
      {
        chainId: 137,
        name: 'Stacker Ventures Token',
        symbol: 'STACK',
        decimals: 18,
        address: '0xccBe9B810d6574701d324fD6DbE0A1b68f9d5bf7',
        logoURI: 'https://assets.coingecko.com/coins/images/14218/small/stack.jpg?1615000614',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xe0955f26515d22e347b17669993fcefcc73c3a0a' },
      },
      {
        chainId: 137,
        name: 'TRAXX',
        symbol: 'TRAXX',
        decimals: 18,
        address: '0xd43be54c1aedf7ee4099104f2dae4ea88b18a249',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xd43be54c1aedf7ee4099104f2dae4ea88b18a249' },
      },
      {
        chainId: 137,
        name: 'NOIIRE COIN',
        symbol: 'NOIIRE',
        decimals: 18,
        address: '0x92a33f4017eca323f00424a36b3c52598035fc16',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xee93b9479e2fdd9bf58d7c11474ad347f5b1eb09' },
      },
      {
        chainId: 137,
        name: 'VAIOT Token',
        symbol: 'VAI',
        decimals: 18,
        address: '0x51738017dc69f23deb5db8de97685cf3b7001e79',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x51738017dc69f23deb5db8de97685cf3b7001e79' },
      },
      {
        chainId: 137,
        name: 'AdBank',
        symbol: 'ADB',
        decimals: 18,
        address: '0xb92d60d0ecbef38dee6a125181825567fccd9dc7',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x2baac9330cf9ac479d819195794d79ad0c7616e3' },
      },
      {
        chainId: 137,
        name: 'SatoMotive Token',
        symbol: 'SV2X',
        decimals: 18,
        address: '0x9b9026901999e612bc396bb285e8fbe3dcc7b78e',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x37810173b70e86b8435f8c28590e8faceff59044' },
      },
      {
        chainId: 137,
        name: 'Sprocket',
        symbol: 'SPROCKET',
        decimals: 18,
        address: '0x0d98eae620491d8f6836a39ac45e54b286fdd2d7',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xa9364d93a4a6d8dc51781236ded2dc4325b668b8' },
      },
      {
        chainId: 137,
        name: 'UniCandy',
        symbol: 'UCD',
        decimals: 18,
        address: '0x546c825f0109353ab4315139e82674f0d86e39d8',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xb1db366890eeb8f28c2813c6a6084353e0b90713' },
      },
      {
        chainId: 137,
        name: 'CLIK',
        symbol: 'CLIK',
        decimals: 18,
        address: '0x76b0ef26d41d55201a7d8c3437c21caef9857149',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xf273e3bc6acdf27c01b8b1c35d39c33b067153dd' },
      },
      {
        chainId: 137,
        name: 'Lockable',
        symbol: 'LC',
        decimals: 18,
        address: '0x41a7e62e231bad6026b82952c78fab6e61d96958',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x41a7e62e231bad6026b82952c78fab6e61d96958' },
      },
      {
        chainId: 137,
        name: 'Forta',
        symbol: 'FORT',
        decimals: 18,
        address: '0x9ff62d1fc52a907b6dcba8077c2ddca6e6a9d3e1',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x41545f8b9472d758bb669ed8eaeeecd7a9c4ec29' },
      },
      {
        chainId: 137,
        name: 'MetaMEMO',
        symbol: 'MEMO',
        decimals: 18,
        address: '0x2710ed3f5d44268dcb89f549050718aa237c8a47',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xeb8eec5a2dbf6e6f4cc542ad31cce706f8f80419' },
      },
      {
        chainId: 137,
        name: 'InventoryClub Token',
        symbol: 'VNT',
        decimals: 18,
        address: '0x2c63b97ec0976e76098371f4300e7fe89f087a02',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xe912b8ba2513d7e29b7b2e5b14398dbf77503fb4' },
      },
      {
        chainId: 137,
        name: 'Kevin',
        symbol: 'KEVIN',
        decimals: 9,
        address: '0x9720d05952cd56893fc5982aaec4508d46a589cb',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xc9f1b23074849d5d6de462af57dae5d3309a1ecc' },
      },
      {
        chainId: 137,
        name: 'Hedron',
        symbol: 'HDRN',
        decimals: 9,
        address: '0x0a436cfe3190c141c5e910fc217e3b27d44042f3',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x3819f64f282bf135d62168c1e513280daf905e06' },
      },
      {
        chainId: 137,
        name: 'CERE Network',
        symbol: 'CERE',
        decimals: 10,
        address: '0x2da719db753dfa10a62e140f436e1d67f2ddb0d6',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x2da719db753dfa10a62e140f436e1d67f2ddb0d6' },
      },
      {
        chainId: 137,
        name: 'InnovaMinex',
        symbol: 'MINX',
        decimals: 6,
        address: '0x4bf6daa0f3b2f8b338836b29f17b9e7ff0e68b53',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xae353daeed8dcc7a9a12027f7e070c0a50b7b6a4' },
      },
      {
        chainId: 137,
        name: 'THUG',
        symbol: 'THUG',
        decimals: 18,
        address: '0xb22ecdfe16bef29ce48a63cde0add3e8b536d122',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xb22ecdfe16bef29ce48a63cde0add3e8b536d122' },
      },
      {
        chainId: 137,
        name: 'Coorest',
        symbol: 'CRST',
        decimals: 18,
        address: '0x91f0484f9b65dc5187e414dae5ed37ea7a4b8af4',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x776aaca47ee579ff63f6c00a921377eb21359e59' },
      },
      {
        chainId: 137,
        name: 'OMI Token',
        symbol: 'OMI',
        decimals: 18,
        address: '0x9cd42aed7d44ee801c827a8e5dcf41df534e9e82',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xed35af169af46a02ee13b9d79eb57d6d68c1749e' },
      },
      {
        chainId: 137,
        name: 'Minato',
        symbol: 'MNTO',
        decimals: 18,
        address: '0x4c9f66b2806538cf00ef596e09fb05bcb0d17dc8',
        logoURI: 'https://minatodao.com/wp-content/uploads/2022/03/pcs-96x96.svg',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x97a9bac06f90940bce9caec2b880ff17707519e4' },
      },
      {
        chainId: 137,
        name: 'Lucky Races Sliver',
        symbol: '$SLIVER',
        decimals: 18,
        address: '0xa95b410743e8c2f7b64f1373d3ca2b3454864a94',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xf5112170ec586385333fbfa15e4a7a4aa9f82cfc' },
      },
      {
        chainId: 137,
        name: '$ZKP Token',
        symbol: '$ZKP',
        decimals: 18,
        address: '0x9a06db14d639796b25a6cec6a1bf614fd98815ec',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x909e34d3f6124c324ac83dcca84b74398a6fa173' },
      },
      {
        chainId: 137,
        name: 'Banana',
        symbol: 'BANANA',
        decimals: 18,
        address: '0xbc91347e80886453f3f8bbd6d7ac07c122d87735',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x94e496474f1725f1c1824cb5bdb92d7691a4f03a' },
      },
      {
        chainId: 137,
        name: 'MetaBillionaireUtilityCoin',
        symbol: 'MBUC',
        decimals: 18,
        address: '0xecd3c4f21dceebc8f308af7c3a7f1a4265bb52e9',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xecaf45a19565fff9d058257b326e52a253343f78' },
      },
      {
        chainId: 137,
        name: 'Akiverse Governance',
        symbol: 'AKV',
        decimals: 18,
        address: '0xf0af7795765273aebfd8a908460b728bdc3fc937',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0x08c38d80b45e4c1e3a6bece6b49312e5fc30b0fb' },
      },
      {
        chainId: 137,
        name: 'BRIX Token',
        symbol: 'BRIX',
        decimals: 18,
        address: '0xabffedaf784dc40a4c1947f9d5ddb3afe2075353',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0x8f10eb64923bf30215e7944c416e891d30e742a1' },
      },
      {
        chainId: 137,
        name: 'CRIPTORO COIN',
        symbol: 'CTRO',
        decimals: 10,
        address: '0x7dc06244536fc5a86123034ee6d9204e436a3e91',
        tags: ['pos', 'erc20'],
        extensions: { rootAddress: '0xb3ab2b676a1efdb16a227e151dc31f5bd3856744' },
      },
      {
        chainId: 137,
        name: 'TiqCoin',
        symbol: 'TIQ',
        decimals: 18,
        address: '0x124e383a31f871a91b923bbcdbf3b0fae625c691',
        tags: ['pos', 'erc20', 'swapable'],
        extensions: { rootAddress: '0xb8949b6de0869735d71d0f07d1e899e57f1076d6' },
      },
    ];
    render(
      <TokenList
        customTokens={[]}
        lists={{ openq: true }}
        polygonDefaultTokens={polygonDefaultTokens}
        openqDefaultTokens={openqDefaultTokens}
      />
    );

    // ASSERT
    expect(screen.getByText(/Chainlink/i)).toBeInTheDocument();
    expect(await screen.getAllByRole('img').length).toBeGreaterThan(1);

    // should not have null or undefined values
    const nullish = [...screen.queryAllByRole(/null/), ...screen.queryAllByRole(/undefined/)];
    expect(nullish).toHaveLength(0);
  });
});
