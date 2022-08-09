import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';


export function useContract(contractAddress: string, ABI: any) {
    if (contractAddress === AddressZero) {
        throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
    }

    const { library, account } = useWeb3React();

    const signerOrProvider = account ? library.getSigner(account).connectUnchecked() : library;

    return useMemo(() => {
        return new Contract(contractAddress, ABI, signerOrProvider);
    }, [contractAddress, ABI, signerOrProvider]);
}

export default useContract;