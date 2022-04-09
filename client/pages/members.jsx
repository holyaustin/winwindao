import React from "react";
import Image from "next/image";
import { Layout } from '../components';
import Header from '../components/Header';
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";

function Members() {
  const query = `{
        keys(where: {lock: "0x869e113e5ff786a9ae8027b73f3eb54b94a159be"}) {
            id
            lock {
                id
            }
            keyId
            owner {
                id
            }
            expiration
            tokenURI
            createdAt
        }
    }`;

  const result = fetch(
    "https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock-rinkeby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }
  )
    .then((r) => r.json())
    .then((r) => r.data.keys);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock-rinkeby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query,
          }),
        }
      )
        .then((r) => r.json())
        .then((r) => r.data.keys);
      setData(res);
    };
    fetchData();
  }, [setData]);

  return (
    <>
    <div className="bg-black h-screen">
      <Layout>
        <Header
          title="WinWin DAO"
          description="WinWin DAO is a DAO that provides investors the opportunity to sponsor new web3 projects through subDAO. "
        />

        <div className="gwidth-full mt-20">
          <h1 className={styles.title}>WinWin DAO Members</h1>
          </div>
        <div className="mx-auto text-center mt-20 px-4 p-4 max-w-2xl bg-white rounded-lg border shadow-md sm:p-8 dark:bg-orange-400 dark:border-gray-700">
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-green-900"
            >
              {data.map((item) => (
                <li className="py-3 sm:py-4" key={item.keyId}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="w-8 h-8 rounded-full"
                        width="100"
                        height="100"
                        src="/b.jpg"
                        alt="users image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item.owner.id}
                      </p>
                      <p className="text-sm text-green-900 truncate dark:text-green-400">
                        Created:{" "}
                        {new Date(item.createdAt * 1000).toLocaleString()}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {item.keyId}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Layout>
      </div>
    </>
  );
}

export default Members;
