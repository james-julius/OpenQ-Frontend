import React, { useContext, useState, useMemo } from 'react';
import StoreContext from '../../store/Store/StoreContext';
import Jazzicon from '../Utils/Jazzicon';
import useEns from '../../hooks/useENS';
import ClaimPerToken from './ClaimPerToken';
import ClaimTotals from './ClaimTotals';
import useGetTokenValues from '../../hooks/useGetTokenValues';
import ToolTipNew from '../Utils/ToolTipNew';

const ClaimOverview = ({ bounty, setInternalMenu }) => {
  const [appState] = useContext(StoreContext);
  const shortenAddress = (address) => {
    if (!address) {
      return '';
    }
    return `${address.slice(0, 4)}...${address.slice(38)}`;
  };
  const tokenAddresses = bounty.deposits
    .map((deposit) => deposit.tokenAddress)
    .filter((itm, pos, self) => {
      return self.indexOf(itm) == pos;
    });
  const claimants = bounty.payouts
    ?.map((payout) => payout.closer.id)
    .filter((itm, pos, self) => {
      return self.indexOf(itm) == pos;
    });
  const claimantsShort = claimants.map((claimant) => {
    const [claimantEnsName] = useEns(claimant);
    return claimantEnsName || shortenAddress(claimant);
  });

  function filterAndAggregate(toFilterPerToken) {
    return tokenAddresses.map((tokenAddress) => {
      const array = toFilterPerToken.filter((element) => element.tokenAddress == tokenAddress);
      const volume =
        array.map((element) => element.volume).reduce((a, b) => parseInt(a) + parseInt(b), 0) || array[0]?.volume;
      return { tokenAddress: tokenAddress, volume: volume } || null;
    });
  }

  const balanceObjDeposits = useMemo(() => filterAndAggregate(bounty.deposits), [bounty]);
  const [balanceValuesDeposits] = useGetTokenValues(balanceObjDeposits);
  const totalDepositValue = balanceValuesDeposits?.total ? balanceValuesDeposits?.total : 0;

  const [sum, setSum] = useState({});

  const changeObj = (claimant, value) => {
    if (claimant in sum && value) {
      setSum((prev) => ({ ...prev, [claimant]: prev[claimant] + value }));
    }
    if (!(claimant in sum) && value) {
      setSum((prev) => ({ ...prev, [claimant]: value }));
    }
  };

  return (
    <>
      <div className='flex max-w-[800px] overflow-auto h-1/2'>
        {bounty.payouts?.length ? (
          <div>
            <thead>
              <tr>
                <th className='px-2 pb-2'></th>
                {tokenAddresses.map((token) => (
                  <th key={token} className='px-2 pb-2'>
                    {appState.tokenClient.getToken(token).symbol}
                  </th>
                ))}
                <th className='px-2 pb-2'>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {claimants.map((claimant, index) => (
                <tr key={claimant}>
                  <td className='flex gap-4 items-center px-2 pb-2' key={claimant + 1}>
                    <Jazzicon tooltipPosition={'-left-2'} size={36} address={claimant} />
                    <span>{claimantsShort[index]}</span>
                  </td>
                  {tokenAddresses.map((tokenAddress) => (
                    <td key={tokenAddress}>
                      <ClaimPerToken
                        bounty={bounty}
                        claimant={claimant}
                        tokenAddress={tokenAddress}
                        type={'perClaimant'}
                        changeObj={changeObj}
                      />
                    </td>
                  ))}
                  <td key={claimant + 2}>
                    <ClaimTotals valueDisplay={sum[claimant]} totalDepositValue={totalDepositValue} />
                  </td>
                </tr>
              ))}
              <tr className='font-bold border-t border-gray-700'>
                <td className='px-2 pb-2'>SubTotal</td>
                {bounty.payouts?.length &&
                  tokenAddresses.map((tokenAddress) => (
                    <td key={tokenAddress}>
                      <ClaimPerToken
                        bounty={bounty}
                        tokenAddress={tokenAddress}
                        type={'allClaimants'}
                        changeObj={changeObj}
                      />
                    </td>
                  ))}
                <td>
                  <ClaimTotals valueDisplay={sum['allClaimants']} totalDepositValue={totalDepositValue} />
                </td>
              </tr>
              <tr>
                <td className='px-2'>Still Claimable</td>
                {tokenAddresses.map((tokenAddress) => (
                  <td key={tokenAddress}>
                    <ClaimPerToken
                      bounty={bounty}
                      tokenAddress={tokenAddress}
                      type={'stillClaimable'}
                      changeObj={changeObj}
                    />
                  </td>
                ))}
                <td>
                  <ClaimTotals valueDisplay={sum['stillClaimable']} totalDepositValue={totalDepositValue} />
                </td>
              </tr>
              <tr className='italic'>
                <td className='flex gap-1 items-center px-2 pb-2 whitespace-nowrap'>
                  of which currently{' '}
                  <button className='italic text-link-colour hover:underline' onClick={() => setInternalMenu('Refund')}>
                    refundable
                  </button>
                  <ToolTipNew
                    innerStyles={'not-italic whitespace-normal w-80'}
                    toolTipText={
                      'Funds that are currently not locked (deposit lock period expired) and have not already been used for claims. Claims will be deducted from deposits with earliest expiration date first.'
                    }
                  >
                    <div className='not-italic cursor-help rounded-full border border-[#c9d1d9] aspect-square leading-4 h-4 box-content text-center font-bold text-primary'>
                      ?
                    </div>
                  </ToolTipNew>
                </td>
                {tokenAddresses.map((tokenAddress) => (
                  <td key={tokenAddress}>
                    <ClaimPerToken
                      bounty={bounty}
                      tokenAddress={tokenAddress}
                      type={'refundable'}
                      changeObj={changeObj}
                    />
                  </td>
                ))}
                <td>
                  <ClaimTotals valueDisplay={sum['refundable']} totalDepositValue={totalDepositValue} />
                </td>
              </tr>
              <tr>
                <td className='px-2'>Refunded</td>
                {tokenAddresses.map((tokenAddress) => (
                  <td key={tokenAddress}>
                    <ClaimPerToken
                      bounty={bounty}
                      tokenAddress={tokenAddress}
                      type={'refunded'}
                      changeObj={changeObj}
                    />
                  </td>
                ))}
                <td>
                  <ClaimTotals valueDisplay={sum['refunded']} totalDepositValue={totalDepositValue} />
                </td>
              </tr>
              <tr className='font-bold border-t border-gray-700'>
                <td className='flex items-center gap-2 px-2 pb-2'>
                  Total Deposited
                  <ToolTipNew
                    innerStyles={'whitespace-normal w-80'}
                    toolTipText={
                      'Everything that has ever been deposited on this bounty. Includes refunded and claimed amounts.'
                    }
                  >
                    <div className='cursor-help rounded-full border border-[#c9d1d9] aspect-square leading-4 h-4 box-content text-center font-bold text-primary'>
                      ?
                    </div>
                  </ToolTipNew>
                </td>

                {tokenAddresses.map((tokenAddress) => (
                  <td key={tokenAddress}>
                    <ClaimPerToken bounty={bounty} tokenAddress={tokenAddress} type={'total'} changeObj={changeObj} />
                  </td>
                ))}
                <td>
                  <ClaimTotals valueDisplay={sum['total']} totalDepositValue={totalDepositValue} />
                </td>
              </tr>
            </tbody>
          </div>
        ) : (
          <div className='text-lg'>No claims have been made yet.</div>
        )}
      </div>
    </>
  );
};

export default ClaimOverview;
