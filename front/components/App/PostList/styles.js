import styled from '@emotion/styled';

export const List = styled.li`
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  width: 100%;
  transition: 0.2s;
  margin-bottom: 1rem;
  & .title{
    text-align: center;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  & .content{
    line-height: 1.4;
    font-size: 0.8rem;
    height: 80px;
  }
  & a{
    color: inherit;
  }
  
  &:hover{
    transform: scale(1.02);
  }
  @media (min-width: 1024px) {
    width: 47.5%;
    
  }
`;

