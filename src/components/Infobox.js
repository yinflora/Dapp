import styled from 'styled-components/macro';

const BoxContainer = styled.section`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 3%;
  font-size: 1.5rem;
  font-weight: 600;
`;

const InfoContainer = styled.ul`
  padding: 5%;
  background-color: #f1f5f7;
`;

const Item = styled.li`
  width: 100%;
  display: flex;
  padding: 5%;
`;

const CategoryItem = styled(Item)`
  margin-bottom: 3%;
  padding: 0 5%;
  justify-content: space-between;
  align-items: center;
`;

const InfoItem = styled(Item)`
  margin-top: 3%;
  gap: 20px;
  flex-direction: column;
  background-color: #fff;

  &:first-of-type {
    margin-top: 0;
  }
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Split = styled.div`
  width: 100%;
  height: 2px;
  background-color: #cbd7e0;
`;

const Details = styled.p`
  font-size: 0.9rem;
`;

const InfoBox = ({ item, balances, transactionRecords }) => {
  return (
    <BoxContainer>
      <Title>{item.mainTitle}</Title>
      <InfoContainer>
        {item.categoryTitle && (
          <CategoryItem>
            {item.categoryTitle.map((title) => (
              <span key={title}>{title}</span>
            ))}
          </CategoryItem>
        )}
        {item.informations &&
          item.informations.map((info, index) => {
            const { type, title, content, unit } = info;
            switch (type) {
              case 'text':
                return (
                  <InfoItem key={title}>
                    <RowWrapper>
                      <span>{title}</span>
                      <span>{content}</span>
                    </RowWrapper>
                  </InfoItem>
                );
              case 'balance':
                return (
                  <InfoItem key={title}>
                    <RowWrapper>
                      <span>{title}</span>
                      <span>{`${balances[unit]} ${unit}`}</span>
                    </RowWrapper>
                  </InfoItem>
                );
              case 'transaction':
                const transactionRecord =
                  transactionRecords && transactionRecords[index];
                return (
                  <InfoItem key={title}>
                    <RowWrapper>
                      <span>{title}</span>
                      <span>{transactionRecord?.blockNumber}</span>
                    </RowWrapper>
                    <Split />
                    <Details>from: {transactionRecord?.fromAddress}</Details>
                    <Details>to: {transactionRecord?.toAddress}</Details>
                  </InfoItem>
                );
              default:
                return null;
            }
          })}
      </InfoContainer>
    </BoxContainer>
  );
};

export default InfoBox;
