import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { HeaderTag , LiTag } from './styles';
import { faHome } from "@fortawesome/free-solid-svg-icons";
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
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </LiTag>
                    <LiTag>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </LiTag>
                    <LiTag>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </LiTag>
                    <LiTag>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </LiTag>
                </ul>
            </HeaderTag>
        </>
    )
};

export default  withRouter(Header);