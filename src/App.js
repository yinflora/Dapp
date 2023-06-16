import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/macro';
import { Reset } from 'styled-reset';
import abi from './abi.json';
import InfoBox from './components/Infobox';
import {
  ETH_ADDRESS,
  RPC_URL,
  TRANSACTION_HASH_1,
  TRANSACTION_HASH_2,
  USDC_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  data,
} from './utils/config';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
  }
`;

const Container = styled.div`
  width: 860px;
  display: flex;
  margin: 100px auto;
  flex-direction: column;
  gap: 10vh;
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [balances, setBalances] = useState({ ETH: 0, USDC: 0, USDT: 0 });
  const [transactionRecords, setTransactionRecords] = useState(null);

  useEffect(() => {
    const initConnection = async () => {
      const provider = new ethers.JsonRpcProvider(RPC_URL);

      const { formattedEth, formattedUsdc, formattedUsdt } = await getBalances(
        provider
      );
      const records = await getTransactions(provider);

      setBalances({
        ETH: formattedEth,
        USDC: formattedUsdc,
        USDT: formattedUsdt,
      });
      setTransactionRecords(records);
      setLoading(false);
    };

    initConnection();
  }, []);

  const getTransactions = async (provider) => {
    const transactions = [TRANSACTION_HASH_1, TRANSACTION_HASH_2];
    let records = [];
    for (const hash of transactions) {
      const transaction = await provider.getTransaction(hash);
      records = [
        ...records,
        {
          transactionHash: transaction.hash,
          blockNumber: transaction.blockNumber,
          fromAddress: transaction.from,
          toAddress: transaction.to,
        },
      ];
    }
    return records;
  };

  const getTokenBalance = async (contractAddress, provider, unit) => {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const res = await contract.balanceOf(ETH_ADDRESS);
    const formattedBalance = ethers.formatUnits(res, unit);
    return formattedBalance;
  };

  const getBalances = async (provider) => {
    const balance = await provider.getBalance(ETH_ADDRESS);
    const formattedEth = ethers.formatEther(balance);
    const formattedUsdc = await getTokenBalance(
      USDC_CONTRACT_ADDRESS,
      provider,
      6
    );
    const formattedUsdt = await getTokenBalance(
      USDT_CONTRACT_ADDRESS,
      provider,
      6
    );
    return { formattedEth, formattedUsdc, formattedUsdt };
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ReactLoading type="spokes" color="#cbd7e0" />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Container>
        {data.map((item) => (
          <InfoBox
            key={item.mainTitle}
            item={item}
            balances={balances}
            transactionRecords={transactionRecords}
          />
        ))}
      </Container>
    </>
  );
}

export default App;
