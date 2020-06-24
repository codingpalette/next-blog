import React from 'react';
import Link from 'next/link';
import { useSelector } from "react-redux";
import styled from '@emotion/styled';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';



const Content = styled.div`
   & a div{
      cursor: pointer;
   }
`;

const CardBox = styled(Card)`
  max-width: 100%;
  width: 100%;
`;

const PostList = () => {
    const { me } = useSelector((state) => state.user);

    return(
        <>
            <Grid item xs={12}>
                <Content>
                    <CardBox>
                        <CardHeader
                            action={
                                me && me.level === 1 && (
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                )
                            }
                            title={ <Link href=""><a>Sample</a></Link> }
                            subheader="September 14, 2016"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Link href="/">
                                <a>
                                    <Chip label="Clickable link" variant="outlined" />
                                </a>
                            </Link>
                        </CardActions>
                    </CardBox>
                </Content>
            </Grid>
        </>
    )
}

export default PostList;