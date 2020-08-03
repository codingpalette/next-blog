import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { END } from 'redux-saga';
import axios from 'axios';
import { backUrl } from '../config/config'

import styled from '@emotion/styled'
import Layout from '../components/Layout';
import NotContent from "../components/NotContent";
import PortfolioModal from "../components/PortfolioModal";

import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import {LOAD_PORTFOLIOS_REQUEST} from "../reducers/portfolio";

import wrapper from '../store/configureStore';



const ContentBox = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    overflow-y: auto;
    @media (min-width: 1024px) {
       height: calc(100% - 50px);
    }
`;


const Container = styled.div`
    display: block;
    width: 100%;
    //height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    
    & ul{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    & ul li {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
    }
    & .list_content{
        padding-bottom: 100%;
        position: relative;    
        overflow: hidden;
    }
    & .list_content img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: 0.3s;
    }
    & .list_content:hover img{
        transform: translate(-50%, -50%) scale(1.1);
    }
    & .list_content .text_content{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color:rgba(0,0,0,0.75);
        opacity: 0;
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & .list_content:hover .text_content{
        opacity: 1;
    }
    & .list_content .text_content h3{
        color: #fff;
        font-size: 2rem;
    }
    @media (min-width: 768px) {
       & ul li {
          width: 50%;
       }
    }
`;




const Portfolio = () => {
    const dispatch = useDispatch();
    const { portfolios, hasMorePortfolios, loadPortfoliosLoading } = useSelector((state) => state.portfolio);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    const scrollContainer = useRef(null);
    const scrollContainerUl = useRef(null);

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_PORTFOLIOS_REQUEST
    //     });
    // }, []);

    useEffect(() => {
        const target = scrollContainer.current;
        const targetUl = scrollContainerUl.current
        function onScroll() {
            // console.log(target.scrollTop , target.clientHeight, targetUl.offsetHeight)
            if (target.scrollTop + target.clientHeight >  targetUl.offsetHeight - 300 ) {
                if (hasMorePortfolios && !loadPortfoliosLoading) {
                    const lastId = portfolios[portfolios.length - 1]?.id;
                    dispatch({
                        type: LOAD_PORTFOLIOS_REQUEST,
                        lastId,
                    })
                }
            }
        }
        target.addEventListener('scroll', onScroll);
        return () => {
            target.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePortfolios, loadPortfoliosLoading, portfolios])

    const onClickModalOpen = useCallback((item) => () => {
        console.log(item)
        setModalItem(item);
        setModalOpen(true);
    }, [setModalOpen, setModalItem])

    return (
        <>
            <Layout>
                <ContentBox  ref={scrollContainer}>
                    <Container  ref={scrollContainerUl}>
                        {portfolios.length > 0 ? (
                            <ul>
                                {portfolios.map((item) => (
                                    <li key={item.id} onClick={onClickModalOpen(item)}>
                                        <div className="list_content">
                                            <img src={`${backUrl}/${item.Images[0].src}`} alt=""/>
                                            <div className="text_content">
                                                <h3>{item.title}</h3>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                {/*{portfolios.map((item) => <PortfolioList key={item.id} post={item} />)}*/}
                            </ul>
                        ) : (
                            <NotContent />
                        )}
                        <PortfolioModal modalOpen={modalOpen} setModalOpen={setModalOpen} modalItem={modalItem} />

                    </Container>
                </ContentBox>
            </Layout>
        </>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // console.log('context -->', context)
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
        type: LOAD_PORTFOLIOS_REQUEST,
    })

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Portfolio;
