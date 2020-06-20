import React from 'react';
import AppLayout from "../components/App/AppLayout";
import PostList from "../components/PostList";

const Home = () =>{
    return(
        <>
            <AppLayout>
                <PostList />
            </AppLayout>
        </>
    )
}

export default Home;