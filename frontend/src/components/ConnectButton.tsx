import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector'
import { shortenAddress } from '../utils/shortenAddress';
import { Web3Provider } from '@ethersproject/providers'


export default function ConnectButton(props:any) {
    const injectedConnector = new InjectedConnector({supportedChainIds: [1,3, 4, 5, 42, ],})
    const { chainId, account, activate, active,library,deactivate  } = useWeb3React<Web3Provider>()
    
    const connect = () => {
      activate(injectedConnector)
    }

    function hardRefresh() {
        window.location.reload();
    }

    if(active){
        return(
            <button
            onClick={deactivate}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 w-[100px] rounded-full shadow-lg"
            >{shortenAddress(account)}</button>
        )
    }
    return(
        <button
        onClick={connect}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 w-[100px] rounded-full shadow-lg"
        >
            Connect
        </button>
    )
}
