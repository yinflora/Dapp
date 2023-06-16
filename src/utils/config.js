import { truncateMiddleString } from './stringHelper';

const RPC_URL =
  'https://eth-mainnet.alchemyapi.io/v2/hJ1r6qGO2qfTbEeuGb-i8GT6ljgksCDh';
const ETH_ADDRESS = '0x33b8287511ac7F003902e83D642Be4603afCd876';
const TRANSACTION_HASH_1 =
  '0x1eb6aab282d701d3d2eeb762bd426df625767e68ebf9c00b484905be1343304e';
const TRANSACTION_HASH_2 =
  '0xf134054861dccf1f211e6fd92808475b2fb290489a4e41bc008260d8cc58b9f9';
const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const USDT_CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const STRING_MAX_LENGTH = 13;
const STRING_PREFIX_LENGTH = 6;
const STRING_SUFFIX_LENGTH = 7;

const data = [
  {
    mainTitle: 'Account Info',
    categoryTitle: null,
    informations: [
      {
        type: 'text',
        title: 'Account Address',
        content: truncateMiddleString(ETH_ADDRESS),
      },
      {
        type: 'balance',
        title: 'ETH Balance',
        unit: 'ETH',
      },
    ],
  },
  {
    mainTitle: 'Transactions',
    categoryTitle: ['TX hash', 'Block'],
    informations: [
      {
        type: 'transaction',
        title: truncateMiddleString(TRANSACTION_HASH_1),
      },
      {
        type: 'transaction',
        title: truncateMiddleString(TRANSACTION_HASH_2),
      },
    ],
  },
  {
    mainTitle: 'Token Holdings',
    categoryTitle: null,
    informations: [
      {
        type: 'balance',
        title: 'USDC Balance',
        unit: 'USDC',
      },
      {
        type: 'balance',
        title: 'USDT Balance',
        unit: 'USDT',
      },
    ],
  },
];

export {
  ETH_ADDRESS,
  RPC_URL,
  STRING_MAX_LENGTH,
  STRING_PREFIX_LENGTH,
  STRING_SUFFIX_LENGTH,
  TRANSACTION_HASH_1,
  TRANSACTION_HASH_2,
  USDC_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  data,
};
