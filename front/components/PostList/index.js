import React from 'react';
import Link from 'next/link';
import {ListContainer, ListBox} from './styles';

const PostList = () => {
    return (
        <>
            <ListContainer>
                <ListBox>
                    <li>
                        <h2>
                            <Link href="/">
                                <a>HTML 이란?</a>
                            </Link>
                        </h2>
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam animi, at dolorem doloremque est ex ipsam iusto, laudantium maxime molestiae nobis non perspiciatis provident repellendus similique voluptatem voluptatibus? Adipisci.
                        </div>
                        <div className="tag_box">
                            
                        </div>
                    </li>
                </ListBox>
            </ListContainer>

        </>
    )
}

export default PostList
