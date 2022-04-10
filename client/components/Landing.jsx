import React, { useContext, useEffect, useState  } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { hasEthereum } from "../lib/ethereum";
import Script from "next/script";
import { useRouter } from 'next/router';
import styles from "../styles/Home.module.css";
import Covalent from "./covalent";
import {Helmet} from "react-helmet";
import Image from 'next/image';

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] font-black text-2xl font-light text-white";

const Landing = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const response = axios.get('https://api.covalenthq.com/v1/pricing/volatility/?quote-currency=USD&format=JSON&tickers=ETH&key=ckey_c2ff142ae0e243359fcfde35554');
      console.log(response.data.data);
      setItems(response.data.data.items)
         } catch (err) {
      // Handle Error Here
      console.error(err);
     }
  }, [])

  const [isLoading, setIsLoading] = useState(false);

 const router = useRouter();
 const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }

    const getData = async () => {
      //Using fetch
      /**
      const response = await fetch("https://api.covalenthq.com/v1/chains/status/?key=ckey_c2ff142ae0e243359fcfde35554")
      const data = await response.json()
      setItems(data.data.items)
      **/
      //using axios https://api.covalenthq.com/v1/chains/?quote-currency=USD&format=JSON&key=ckey_c2ff142ae0e243359fcfde35554
      // https://api.covalenthq.com/v1/chains/status/?quote-currency=USD&format=JSON&key=ckey_c2ff142ae0e243359fcfde35554
      // https://api.covalenthq.com/v1/pricing/volatility/?quote-currency=USD&format=JSON&tickers=ETH&key=ckey_c2ff142ae0e243359fcfde35554
      // https://api.covalenthq.com/v1/pricing/volatility/?quote-currency=USD&format=JSON&tickers=ETH&key=ckey_c2ff142ae0e243359fcfde35554
      

       
    }

    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  

  const openUnlockProtocol = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
    router.push('/dashboard')
  };

  // Render Methods
const renderContent = () => {
  /*
  * If the app is currently loading, just render out LoadingIndicator
  */
  if (!isLoading) {
   return <Covalent />;
 }
}

  return (
    <>
    <Script id="show-banner" strategy="lazyOnload">
    {`(function (d, s) {
      var js = d.createElement(s),
        sc = d.getElementsByTagName(s)[0];
      js.src =
        "https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
      sc.parentNode.insertBefore(js, sc);
    })(document, "script");`}
  </Script>
  <Script id="unlock-protocol-config" strategy="lazyOnload">
    {`var unlockProtocolConfig = {
      "pessimistic": false,
      "locks": {
        "0x102E6F51765DcdBEc35a4b41cA0391c81fCE91cB": {
          "network": 4,
          "name": "New Lock"
        }
      },
      "icon": "https://unlock-protocol.com/static/images/svg/unlock-word-mark.svg",
      "callToAction": { "default": "Please join the WinWinDAO membership!" },
      "metadataInputs": [{
        name: 'First Name',
        type: 'text',
        required: true,
        public: true,
        placeholder: 'First Name'
      }, 
      {
        name: 'Last Name',
        type: 'text',
        required: true,
        public: false,
        placeholder: 'Last Name'
      },
      {
        name: 'Email',
        type: 'email',
        required: true,
        public: false,
        placeholder: 'example@example.com'
      }]
    }`}
  </Script>

    <div className="flex w-full md:justify-center  items-center ">
      <div className="flex mf:flex-row  flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
        <div className="grid sm:grid-cols-1 width-full mt-3">
          <h1 className={styles.title}>Welcome to WinWin DAO!</h1>

          <div className="grid sm:grid-cols-2 width-full mt-3">
          <div className= "mt-10 ml-20 pl-20 pt-10" >
          <Image
              src="/winwindaologo.png"
              alt="logo"
              width={540}
              height={500}
            />

          </div>
          <div className={styles.description } >
          WinWInDAO is a Decentralized Autonomous Organization for Web3 
          investors. Members contribute capital to Web3 Projects in form of investments to startups. When a 
          proposal is submitted, All members that voted YES, Automatically form a subDAO to finance the Project. 
          If you voted NO, you dont finance that project. This Makes investor put there money in projects 
          they believe in. < br />< br />
            Total Number of DAO Members: {"0"}
            <br />
            Treasury Balance: "0.01" ETH
            <br />
            Total Number of Proposals: " 12 Proposals"

            <br />  <br />  <br />
          {/* Checks if account is connected or not*/}

           <button
              className="w-full flex flex-row justify-center items-center my- bg-green-500 p-3 rounded-full cursor-pointer hover:bg-orange-400"
              type="button"
              onClick={openUnlockProtocol}
                          >
              <p className="text-white text-base font-semibold text-4xl">
                Enter the DAO
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className="text-white text-base font-semibold text-3xl flex justify-center mb-10">
        <p>Membership cost ETH (ETH Spot Price)</p>
        <br /><br /><br />
        <p></p>

      </div>

    <br />

 {console.log(items)}
    <table>
      <thead>
            <tr>
                <th></th>
                <th>Token Name</th>
                <th>Symbol</th>
                <th>Current Price</th>
            </tr>
        </thead>
        <tbody>
        <th></th>
                <th>{items.map(item => (
          <li key={item.contract_name}>
            {item.contract_name}
          </li>
        ))}</th>

                <th>{items.map(item => (
          <li key={item.contract_ticker_symbol}>
            {item.contract_ticker_symbol}
          </li>
        ))}</th>

                <th>{items.map(item => (
          <li key={item.quote_rate}>
            {item.quote_rate}
          </li>
        ))}</th> 
        </tbody>
    </table>

    <br /> <br /> <br />

          <div className="grid sm:grid-cols-3 width-full mt-10 mb-20 mr-20 ml-20 pl-10 pr-10 ">
            <div className={`rounded-tl-2xl border-8 border-orange-400  ${commonStyles}`} >On-Chain Governance</div>
            <div className={`border-8 border-orange-400 ${commonStyles}`}>Self-sustained</div>
            <div className={`rounded-tr-2xl border-8 border-orange-400 ${commonStyles}`}>Open source</div>
            <div className={`border-8 border-orange-400 ${commonStyles}`}> Shared Treasury </div>
            <div className={`border-8 border-orange-400 ${commonStyles}`}>Community Managed</div>
            <div className={`border-8 border-orange-400 ${commonStyles}`}>Project Proposals</div>
            <div className={`rounded-bl-2xl border-8 border-orange-400 ${commonStyles}`}>Voting</div>
            <div className={`border-8 border-orange-400 ${commonStyles}`}>Trustless</div>
            <div className={`rounded-br-2xl border-8 border-orange-400 ${commonStyles}`}>Web3 Grant</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Landing;
