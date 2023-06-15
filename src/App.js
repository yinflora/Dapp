import { ethers } from 'ethers';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import abi from './abi.json';

const RPC_URL =
  'https://eth-mainnet.alchemyapi.io/v2/hJ1r6qGO2qfTbEeuGb-i8GT6ljgksCDh';
const ADDRESS = '0x33b8287511ac7F003902e83D642Be4603afCd876';

const STRING_MAX_LENGTH = 13;
const STRING_PREFIX_LENGTH = 6;
const STRING_SUFFIX_LENGTH = 7;

const TRANSACTION_HASH_1 =
  '0x1eb6aab282d701d3d2eeb762bd426df625767e68ebf9c00b484905be1343304e';
const TRANSACTION_HASH_2 =
  '0xf134054861dccf1f211e6fd92808475b2fb290489a4e41bc008260d8cc58b9f9';

const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const USDT_CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
  }
`;

const Container = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoBlock = styled.section`
  width: 100%;
`;

const BlockWrapper = styled.div`
  padding: 20% 10%;
  background-color: gray;
`;

const BlockTitle = styled.h2``;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 10%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const SubTitle = styled.span``;

const InfoText = styled.span``;

function App() {
  const [ethBalance, setEthBalance] = useState(0);
  const [transactionRecords, setTransactionRecords] = useState([]);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);

  useEffect(() => {
    const initConnection = async () => {
      const provider = new ethers.JsonRpcProvider(RPC_URL);

      const balance = await provider.getBalance(ADDRESS);
      const ethValue = ethers.formatEther(balance);
      setEthBalance(ethValue);

      let records = [...transactionRecords];

      const transaction1 = await provider.getTransaction(TRANSACTION_HASH_1);
      records = [
        ...records,
        {
          transactionHash: transaction1.hash,
          blockNumber: transaction1.blockNumber,
          fromAddress: transaction1.from,
          toAddress: transaction1.to,
        },
      ];

      const transaction2 = await provider.getTransaction(TRANSACTION_HASH_2);
      records = [
        ...records,
        {
          transactionHash: transaction2.hash,
          blockNumber: transaction2.blockNumber,
          fromAddress: transaction2.from,
          toAddress: transaction2.to,
        },
      ];

      setTransactionRecords(records);

      const usdcContract = new ethers.Contract(
        USDC_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const usdcBalance = await usdcContract.balanceOf(ADDRESS);
      const formattedUsdc = ethers.formatUnits(usdcBalance, 6);
      setUsdcBalance(formattedUsdc);

      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const usdtBalance = await usdtContract.balanceOf(ADDRESS);
      const formattedUsdt = ethers.formatUnits(usdtBalance, 6);
      setUsdtBalance(formattedUsdt);
    };
    initConnection();
  }, []);

  const truncateMiddleString = (string) => {
    if (string.length <= STRING_MAX_LENGTH) return string;

    const prefix = string.substring(0, STRING_PREFIX_LENGTH);
    const suffix = string.substring(string.length - STRING_SUFFIX_LENGTH);

    return `${prefix}...${suffix}`;
  };

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Container>
        <InfoBlock>
          <BlockTitle>Account Info</BlockTitle>
          <BlockWrapper>
            <InfoWrapper>
              <SubTitle>Account Address</SubTitle>
              <InfoText>{truncateMiddleString(ADDRESS)}</InfoText>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>ETH Balance</SubTitle>
              <InfoText>{ethBalance} ETH</InfoText>
            </InfoWrapper>
          </BlockWrapper>
        </InfoBlock>
        <InfoBlock>
          <span>TX Hash</span>
          <span>Block</span>
          <BlockWrapper>
            {transactionRecords.length > 0 &&
              transactionRecords.map((record) => (
                <InfoWrapper>
                  <SubTitle>
                    {truncateMiddleString(record.transactionHash)}
                  </SubTitle>
                  <InfoText>{record.blockNumber}</InfoText>
                </InfoWrapper>
              ))}
          </BlockWrapper>
        </InfoBlock>
        <InfoBlock>
          <BlockTitle>Token Holdings</BlockTitle>
          <BlockWrapper>
            <InfoWrapper>
              <SubTitle>USDC Balance</SubTitle>
              <InfoText>{usdcBalance} USDC</InfoText>
            </InfoWrapper>
            <InfoWrapper>
              <SubTitle>USDT Balance</SubTitle>
              <InfoText>{usdtBalance} USDT</InfoText>
            </InfoWrapper>
          </BlockWrapper>
        </InfoBlock>
      </Container>
    </>
  );
}

export default App;
