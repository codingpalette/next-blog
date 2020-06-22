import React from 'react';
import Link from 'next/link';
import { List } from './styles';
import Square from "../Square";



const PostList = () => {
    return (
        <>
            <List>
                <Link href="/">
                    <a>
                        <Square color="#96969c" />
                        <div>
                            <h2 className="title">Title</h2>
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Culpa expedita ipsam numquam placeat qui ullam vero.
                                Ab deleniti doloribus esse hic omnis optio quidem veniam. Aperiam libero optio quisquam
                            </div>
                        </div>
                    </a>
                </Link>
            </List>
            <List>
                <Link href="/">
                    <a>
                        <Square color="#96969c" />
                        <div>
                            <h2 className="title">Title</h2>
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Culpa expedita ipsam numquam placeat qui ullam vero.
                            </div>
                        </div>
                    </a>
                </Link>
            </List>
            <List>
                <Link href="/">
                    <a>
                        <Square color="#96969c" />
                        <div>
                            <h2 className="title">Title</h2>
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Culpa expedita ipsam numquam placeat qui ullam vero.
                            </div>
                        </div>
                    </a>
                </Link>
            </List>
            <List>
                <Link href="/">
                    <a>
                        <Square color="#96969c" />
                        <div>
                            <h2 className="title">Title</h2>
                            <div className="content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Culpa expedita ipsam numquam placeat qui ullam vero.
                                Ab deleniti doloribus esse hic omnis optio quidem veniam. Aperiam libero optio quisquam
                            </div>
                        </div>
                    </a>
                </Link>
            </List>



        </>
    )
}

export default PostList
