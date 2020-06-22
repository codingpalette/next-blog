import styled from '@emotion/styled';

export const SquareCotainer = styled.div`
  position:absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  
  & > div{
    position: absolute;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
  }
  
  & .top{
    top: 0;
    border-top: 2px solid ${props => props.color};
  }
  & .left{
    left: 0;
    border-left: 2px solid ${props => props.color};
  }
  & .right{
    right: 0;
    border-right: 2px solid ${props => props.color};
  }
  & .btm{
    bottom: 0;
    border-bottom: 2px solid ${props => props.color};
  }
  
  
  
`