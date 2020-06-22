import styled from '@emotion/styled';

export const DivTag = styled.div`
    width: 100%;
    height: calc(100% - 170px);
    padding: 12px;
    box-sizing: border-box;
    position:relative;
    margin-top: 1rem;
    @media (min-width: 1024px) {
      height: 100%;
      margin-top: 0;
      margin-left: 2rem;
      max-width: 800px;
    }
`;

export const SearchBox = styled.div`
    border:1px solid #edf1f7;
    border-bottom: none;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.25rem 0.25rem 0 0;
    box-sizing: border-box;
`

export const ContentBox = styled.div`
  //border:1px solid #edf1f7;
  //background-color: #fff;
  //padding: 1rem;
  //border-radius: 0.25rem;
  box-sizing: border-box;
  position: relative;
  z-index: 20;
  width: 100%;
  height: 100%;
  border:2px solid #000;
`;