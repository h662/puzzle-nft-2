import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function Mint() {
  const [tokenId, setTokenId] = useState(1);
  const [amount, setAmount] = useState(1);
  const [metadata, setMetadata] = useState();

  const { signer, contract } = useOutletContext();

  const onClickMint = async () => {
    try {
      if (!signer || !contract || !tokenId || !amount) return;

      await contract.mintNFT(tokenId, amount);

      const response = await contract.uri(tokenId);

      const axiosResponse = await axios.get(response);

      setMetadata(axiosResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-8 flex flex-col items-center">
      <div>
        <input
          className="input-style"
          type="number"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          className="input-style mx-4"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className={`btn-style ${
            !signer && "bg-gray-300 border-gray-500 cursor-not-allowed"
          }`}
          disabled={!signer}
          onClick={onClickMint}
        >
          Mint
        </button>
      </div>
      <div className="mt-8">
        {metadata && (
          <>
            <img src={metadata.image} alt={metadata.name} />
            <h1 className="my-2 text-xl font-semibold">{metadata.name}</h1>
            <h3>{metadata.description}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Mint;
