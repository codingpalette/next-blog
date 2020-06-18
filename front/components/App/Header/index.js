import React from 'react';
import Link from 'next/link';
import { HeaderTag } from './styles';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
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
                    <li>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faHome} size="sm" />
                            </a>
                        </Link>
                    </li>
                </ul>
            </HeaderTag>
        </>
    )
};

export default  Header;