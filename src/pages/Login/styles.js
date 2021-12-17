import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display:flex;
    @media screen and (max-width: 450px) {
        flex-direction: column;
    }
`;

export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;    
    justify-content: center;  
    padding: 0 5%;
`;

export const InputGroup = styled.div`
    background-color: #9f3232;
    height: 100%;
    width: 30%;
    @media screen and (max-width: 800px) {
        width: 50%;
    }
    @media screen and (max-width: 450px) {
        width: 100%;
    }
`;

export const Card = styled.div`
    height: 100%;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 800px) {
        width: 50%;
    }
    @media screen and (max-width: 450px) {
        width: 100%;
    }
`;

export const Image = styled.img`
    width: 50%;
`;