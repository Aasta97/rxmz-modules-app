import styled from 'styled-components';

export const ContainerCards = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const CardUsers = styled.div`
  width: 200px;
  height: 100px;
  background-color: #;
  border-radius: 3px;
  padding: 15px;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Card = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${props => props.color };
  border-radius: 3px;
  padding: 15px;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
