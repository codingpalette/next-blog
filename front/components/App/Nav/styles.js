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
  border:2px solid #000;
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
    font-family: 'DOSMyungjo';
  }
  & .top h1{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: 'DOSMyungjo';
  }

`;

export const LiTag = styled.li`
    display: block;
    height: 30px;
    line-height: 30px;
    width: 100%;
    background-color : ${props =>
        props.path ? '#f9f9ff' : '#fff'
    };
    font-family: 'DOSMyungjo';
    text-align: left;
    
    & a{
        display: block;
        padding: 0 1rem;
        box-sizing: border-box;
        color: #000;
        letter-spacing: 1px;
    }

`;