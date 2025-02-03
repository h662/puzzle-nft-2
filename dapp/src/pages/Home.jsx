import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
  const tokenIds = Array.from({ length: 16 }, (_, i) => i + 1);

  const [balances, setBalances] = useState(Array(16).fill(0));
  const [ownedCount, setOwnedCount] = useState(0);

  const { signer, contract } = useOutletContext();

  useEffect(() => {
    const getMyNFTs = async () => {
      try {
        if (!signer || !contract) return;

        const responses = await Promise.all(
          tokenIds.map(async (id) => {
            const balance = await contract.balanceOf(signer.address, id);

            return Number(balance);
          })
        );

        setBalances(responses);
      } catch (error) {
        console.error(error);
      }
    };

    getMyNFTs();
  }, [signer, contract]);

  useEffect(() => {
    setOwnedCount(balances.filter((balance) => balance > 0).length);
  }, [balances]);

  useEffect(
    () => console.log((ownedCount / tokenIds.length) * 100),
    [ownedCount]
  );

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-96 h-6 bg-gray-300 rounded-lg mb-4">
        <div
          className={`bg-blue-400 h-full rounded-lg`}
          style={{ width: `${(ownedCount / tokenIds.length) * 100}%` }}
        ></div>
      </div>
      <div>
        보유한 NFT: {ownedCount} / {tokenIds.length}
      </div>
      <div className="grid grid-cols-4 w-112 mt-4">
        {tokenIds.map((v, i) => (
          <img
            className={`${balances[i] === 0 && "brightness-50"}`}
            key={v}
            src={`/images/${v}.jpg`}
            alt={v}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
