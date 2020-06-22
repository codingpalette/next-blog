import React from 'react';
import { DivTag, SearchBox, ContentBox } from './styles'
import Square from "../Square";

const Main = ({children}) => {
    return(
        <>
            <DivTag>
                {/*<SearchBox>*/}
                {/*    검색박스*/}
                {/*</SearchBox>*/}
                <Square color="#000" />
                <ContentBox>
                    {children}
                </ContentBox>
            </DivTag>
        </>
    )
};

export default Main;