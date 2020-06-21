import styled from '@emotion/styled';


export const HeaderTag = styled.header`
  padding: 0 20px;
  box-sizing: border-box;
  height: 60px;
  margin-top: auto;
  background-color: #fff;
  border-top: 1px solid #edf1f7;
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
    max-width: 40px;
    margin: 0 auto;
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
  
  
  @media (min-width: 1024px) {
     width: 300px;
     height: 100%;
     padding: 1.5rem 0;
     border-top: none;
     border-right: 1px solid #edf1f7;
     
     & h1{
        display: block;
     }
     
     & ul {
        padding: 2rem 0;
        height: auto;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        
     }
     
     
  }
`

export const LiTag = styled.li`

    width: 14%;
    
 
  & a{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    color : ${props =>
        props.path ? 'rgba(108,99,255,1)' : '#aab0b7'
    };
    transition: color 0.2s;
  }
  & a:hover{
    color: rgba(108,99,255,0.75);
  }
  & a svg{
    height: 100%;
    max-width: 25px;
  }
  & a span{
    display: none;
  }
  
  @media (min-width: 1024px) {
    
    width: 100%;
    height: 30px;
    + li{
        margin-top: 2.5rem;
    }
    & a{
        text-align: left;
        padding: 0 1rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    & a svg{
        margin-right: 1rem;
        max-width: 15px;
    }
    & a span{
        display: block;
    }
  }

`;