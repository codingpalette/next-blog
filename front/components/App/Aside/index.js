import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { AsideContainer, NavContainer, Content, LiTag } from './styles';
import Square from "../../Square";

const Aside = ({ router }) => {
    return(
        <>
            <AsideContainer>
                <NavContainer>
                    <Square />
                    <Content>
                        <div className="top">
                            {/*<button>Back</button>*/}
                            <h1>CodingPalette</h1>
                        </div>
                        <div className="btm">
                            <ul>
                                <LiTag path={router.pathname === '/'}>
                                    <Link href="/">
                                        <a>HOME</a>
                                    </Link>
                                </LiTag>
                                <LiTag path={router.pathname === '/about'}>
                                    <Link href="/about">
                                        <a>ABOUT</a>
                                    </Link>
                                </LiTag>
                                <LiTag path={router.pathname === '/portfolio'}>
                                    <Link href="/portfolio">
                                        <a>PORTFOLIO</a>
                                    </Link>
                                </LiTag>
                            </ul>
                        </div>
                    </Content>
                </NavContainer>
            </AsideContainer>
        </>
    )
};

export default withRouter(Aside)