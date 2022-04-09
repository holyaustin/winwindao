import { Landing, Layout } from '../components';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="bg-black h-screen">
      <Layout>
        <Header
          title="WinWin DAO"
          description="WinWin DAO is a DAO that provides investors the opportunity to sponsor new web3 projects through subDAO. "
        />
        <Landing />
      </Layout>
    </div>
  );
}
