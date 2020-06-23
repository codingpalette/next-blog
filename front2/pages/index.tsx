import Link from 'next/link'
import Layout from '../components/Layout';
import styled from '@emotion/styled';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const ContainerBox = styled(Container)`
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
`;

const Content = styled.div`
    
    & a{
        padding: 1rem;
        display: block;
    }
`;

const IndexPage = () => {
    return(
        <>
            <Layout >
                <ContainerBox maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Content>
                                <Paper >
                                    <Link href='/about'>
                                        <a>
                                            dfd
                                        </a>
                                    </Link>
                                </Paper>
                            </Content>
                        </Grid>
                        <Grid item xs={12}>
                            <Content>
                                <Paper >
                                    <Link href='/about'>
                                        <a>
                                            dfd
                                        </a>
                                    </Link>
                                </Paper>
                            </Content>
                        </Grid>
                    </Grid>




                </ContainerBox>

            </Layout>
        </>
    )

}

export default IndexPage
