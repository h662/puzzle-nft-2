import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import MintNFT from "../lib/MintNFT.json";

function Layout() {
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    if (!signer) return;

    setContract(
      new Contract(
        "0xE14cBA8725C253dE41b2375aE82D244D1aDCF955",
        MintNFT,
        signer
      )
    );
  }, [signer]);

  return (
    <div className="min-h-screen">
      <Header signer={signer} setSigner={setSigner} />
      <Outlet context={{ signer, contract }} />
    </div>
  );
}

export default Layout;
