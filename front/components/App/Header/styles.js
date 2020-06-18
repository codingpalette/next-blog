import styled from '@emotion/styled'

export const HeaderTag = styled.header`
  order: 2;
  padding: 0 20px;
  box-sizing: border-box;
  height: 60px;
  margin-top: auto;
  background-color: #fff;
  border-top: 1px solid #f5f6fad9;
  & h1{
    display: none;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  & h1 a{
    display: block;
    width: 100%;
  }
  & h1 a img{
    display: block;
    width: 100%;
    height: auto;
  }
  & ul{
    padding:0.5rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  & li{
    width: 14%;
  }
  & li a{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #aab0b7;
  }
  & li a svg{
    height: 100%;
    max-width: 30px;
  }
  
  @media (min-width: 1024px) {
     width: 90px;
     height: 100%;
     order: 0;
     padding: 1.5rem 0;
     border-top: none;
     
     & h1{
        display: block;
     }
     
     & ul {
        padding: 0;
        flex-direction: column;
        justify-content: center;
        margin-top: calc(-58px - 1.5rem);
     }
     
     & li{
        width: 100%;
     }
     
     & li + li{
        margin-top: 2.5rem;
     }
  }
`