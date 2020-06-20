import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { HeaderTag , LiTag } from './styles';
import { faHome , faUser, faTag, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({router}) => {
    return(
        <>
            <HeaderTag>
                <h1>
                    <Link href="/">
                        <a>
                            <img src="/images/logo.png" alt=""/>
                        </a>
                    </Link>
                </h1>
                <ul>
                    <LiTag path={router.pathname === '/'}>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} />
                                <span>Home</span>
                            </a>
                        </Link>
                    </LiTag>
                    <LiTag path={router.pathname === '/about'}>
                        <Link href="/about">
                            <a>
                                <FontAwesomeIcon icon={faUser} />
                                <span>About</span>
                            </a>
                        </Link>
                    </LiTag>
                    <LiTag path={router.pathname === '/tag'}>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faTag}  />
                                <span>태그</span>
                            </a>
                        </Link>
                    </LiTag>
                    <LiTag path={router.pathname === '/portfolio'}>
                        <Link href="/portfolio">
                            <a>
                                <FontAwesomeIcon icon={faBookOpen}  />
                                <span>Portfolio</span>
                            </a>
                        </Link>
                    </LiTag>
                </ul>
            </HeaderTag>
        </>
    )
};

export default  withRouter(Header);