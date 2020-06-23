import Link from 'next/link'
import Layout from '../components/Layout';
import Button from '@material-ui/core/Button';


const IndexPage = () => (
    <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hello Next.js 👋</h1>
        <Button variant="contained" color="primary">
            Primary
        </Button>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </Layout>
)

export default IndexPage
