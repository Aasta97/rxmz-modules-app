import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        background: #fff;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    html, body, #root{
        height: 100%;
        width: 100%;
    }
    
    @keyframes fade{
        from{
            opacity: 0;
        }to{
            opacity: 1;
        }
    }
    @keyframes move-right{
        from{
            transform: translateX(-100%);        
        }to{
            transform: translateX(0);
        } 
    }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContainerForm = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.div`
  height: auto;
  width: 80%;
  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
`;

export const InputGroup = styled.div`
    display: flex;
    gap: 10px;
    .default{
        background-color: #21409e;
    }

    .error{
        background-color: #9f3232;
    }
`;

export const Input = styled.input`
    height: 35px;
    width: 100%;
    padding: 0 8px;
    border: none;
    outline: none;
    transition: .2s ease-in-out;
    box-sizing: border-box;
    color: #fff;
    margin: 5px 0;
    color: #222;
`;

export const Textarea = styled.textarea`
    height: 60px;
    width: 100%;
    padding: 0 8px;
    border: none;
    outline: none;
    transition: .2s ease-in-out;
    box-sizing: border-box;
    color: #fff;
    margin: 5px 0;
    color: #222;
`;

export const Select = styled.select`
    height: 35px;
    width: 100%;
    padding: 0 8px;
    border: none;
    border: 1px solid #FFF;
    color: #fff;
    margin: 5px 0;
    color: #222;
`;

export const Option = styled.option`
    border-radius: 3px;
    color: #222;
`;

export const Button = styled.button`
    border: none;
    height: 35px;
    width: 100%;
    color: #fff;
    cursor: pointer;
    background-color: #6e1919;
    margin: 5px 0;
    transition: ease all 300ms;
`;
