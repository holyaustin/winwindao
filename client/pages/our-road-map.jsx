import { Layout } from '../components';
import Header from '../components/Header';
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';


const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] font-black text-2xl font-light text-white";
  
  export default function Dashboardd() {
    const router = useRouter();

    const openVote = () => {
      window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
      router.push('/vote')
    };
  
    const openSubmit = () => {
      window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
      router.push('/submit')
    };
  
    const openMembers = () => {
      window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
      router.push('/members')
    };
  
    const openContribute = () => {
      window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
      router.push('/dashboard')
    };
  
  return (
    <div className="bg-black h-screen">
      <Layout>
        <Header
          title="WinWin DAO"
          description="WinWin DAO is a DAO that provides investors the opportunity to sponsor new web3 projects through subDAO. "
        />
           <>
    <div className="flex w-full md:justify-center  items-center ">
      <div className="flex mf:flex-row  flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
        <div className="grid sm:grid-cols-1 width-full mt-3 mb-20">
          <h1 className={styles.title}>Our Road Map</h1>
    </div>

    <div className="grid sm:grid-cols-1 width-full mt-20 mb-20">
          <h1 className={styles.title}>Page Under Construction</h1>
    </div>
    <div className="grid sm:grid-cols-1 width-full mt-20 mb-20">
          <h1 className={styles.title}>Page Under Construction</h1>
    </div>
    <div className="grid sm:grid-cols-1 width-full mt-20 mb-20">
          <h1 className={styles.title}>Page Under Construction</h1>
    </div>
    </div>
    </div>
    </div>

    </>
      </Layout>
    </div>
  );
}
