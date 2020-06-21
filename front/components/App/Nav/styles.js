import styled from '@emotion/styled';


export const NavContainer = styled.div`
  width: 100%;
  display: block;
  padding: 12px;
  box-sizing: border-box;
  position:relative;
  @media (min-width: 1024px) {
    width: 320px;
  }
`;

export const Content = styled.header`
  position: relative;
  z-index: 20;
  & .top{
    background-color: #96969c;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    position: relative;
  }
  & .top button{
    text-decoration: underline;
  }
  & .top h1{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
  & .menu_btn{
    display: block;
    height: 30px;
    text-align: center;
    line-height: 30px;
    width: 100%;
    background-color: #fff;
    font-weight: bold;
  }

`;