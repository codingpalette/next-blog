import React from 'react';
import { DivTag, SearchBox, ContentBox } from './styles'

const Content = ({children}) => {
    return(
        <>
            <DivTag>
                <SearchBox>
                    검색박스
                </SearchBox>
                <ContentBox>
                    {children}
                </ContentBox>
            </DivTag>
        </>
    )
};

export default Content;