import styled from 'styled-components';

export const Nav = styled.div`
  height: 100%;
  width: 200px;
  background-color: #9f3232;
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  align-items: center;
`;

export const Image = styled.img`
  width: 80%;
  margin-bottom: 40px;
`;

export const ItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Item = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.7s ease;
  display: flex;
  align-items: center;
  a{
    color: #fff;
    text-decoration: none;
  }

  &:hover{
    opacity: 0.8;
    background-color: #9f3232;
    border-radius: 3px;
  }

  svg{
    margin-right: 20px;
    color: #161158;
    font-size: 20px;
  }
`;
