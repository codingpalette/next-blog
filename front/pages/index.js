import React from 'react';
import AppLayout from "../components/App/AppLayout";
import PostList from "../components/PostList";
import ContentHeader from "../components/Content/ContentHeader";
import ContentBody from "../components/Content/ContentBody";
import styled from '@emotion/styled';

const Ul = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () =>{
    return(
        <>
            <AppLayout>
                <ContentHeader>
                    HOME
                </ContentHeader>
                <ContentBody>
                    <div>
                        <Ul>
                            <PostList />
                        </Ul>
                    </div>
                </ContentBody>
            </AppLayout>
        </>
    )
}

export default Home;