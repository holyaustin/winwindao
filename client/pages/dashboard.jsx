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
      router.push('/under')
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
      router.push('/under')
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
        <div className="grid sm:grid-cols-1 width-full mt-3">
          <h1 className={styles.title}>Welcome to WinWin DAO! Dashboard</h1>



    
    <div className="min-h-screen">
          <div className="grid sm:grid-cols-2 width-full mt-20 mb-20 mr-20 ml-20 pl-10 pr-10 ">
            <div className={`rounded-tl-2xl border-2 border-orange-400 hover:bg-green-500 ${commonStyles}`} >
            <button
              className="w-full flex flex-row justify-center items-center my- bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-900"
              type="button"
              onClick={openSubmit}
                          >
              <p className="text-white text-base font-semibold text-4xl">
              Submit Proposal
              </p>
            </button>
              
              </div>
            <div className={`rounded-tr-2xl border-2 border-orange-400 hover:bg-green-500 ${commonStyles}`}>
            <button
              className="w-full flex flex-row justify-center items-center my- bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-900"
              type="button"
              onClick={openVote}
                          >
              <p className="text-white text-base font-semibold text-4xl">
              Vote for Proposal
              </p>
            </button>
              
              </div>
           
            <div className={`rounded-bl-2xl border-2 border-orange-400 hover:bg-green-500 ${commonStyles}`}>
            <button
              className="w-full flex flex-row justify-center items-center my- bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-900"
              type="button"
              onClick={openMembers}
                          >
              <p className="text-white text-base font-semibold text-4xl">
              View Members
              </p>
            </button>
              
              </div>
            <div className={`rounded-br-2xl border-2 border-orange-400 hover:bg-green-500 ${commonStyles}`}>
            <button
              className="w-full flex flex-row justify-center items-center my- bg-green-500 p-3 rounded-full cursor-pointer hover:bg-green-900"
              type="button"
              onClick={openContribute}
                          >
              <p className="text-white text-base font-semibold text-4xl">
              Contribute to Treasury
              </p>
            </button>
             </div>
          </div>
    </div>
    
    </div>
    </div>
    </div>
    </div>

    </>
      </Layout>
    </div>
  );
}
