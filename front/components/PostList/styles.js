import styled from '@emotion/styled';

export const ListContainer = styled.div`
  
`;


export const ListBox = styled.ul`
  
  
  & li{
    border: 1px solid #edf1f7;
    background-color: #fff;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
  }
  
  & li + li{
    margin-top: 1.5rem;
  }
  
  & h2{
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
  & h2 a{
    display: inline-block;
    color: inherit;
    position: relative;
  }
  & h2 a:before{
    content:'';
    display: block;
    width: 0;
    height: 2px;
    background-color:#242939;
    position: absolute;
    left: 50%;
    bottom: -5px;
    transform: translateX(-50%) ;
    transition:  0.3s;
  }
  & h2 a:hover:before{
    width: 100%;
  }
  
  & .content{
    margin-top: 25px;
    line-height: 1.5;
  }
  
  
  
  
  
`;

