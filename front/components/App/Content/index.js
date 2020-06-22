import React from 'react';
import { DivTag, SearchBox, ContentBox } from './styles'
import Square from "../../Square";

const Content = ({children}) => {
    return(
        <>
            <DivTag>
                {/*<SearchBox>*/}
                {/*    검색박스*/}
                {/*</SearchBox>*/}
                <Square />
                <ContentBox>
                    {children}
                </ContentBox>
            </DivTag>
        </>
    )
};

export default Content;