// Third Party
import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';

// Custom
import useWeb3 from '../../hooks/useWeb3';
import TokenFundBox from './SearchTokens/TokenFundBox';
import StoreContext from '../../store/Store/StoreContext';
import ButtonLoadingIcon from '../Loading/ButtonLoadingIcon';
import ToolTip from '../ToolTip/ToolTip';
import BountyClosed from '../BountyClosed/BountyClosed';
import ApproveTransferModal from './ApproveTransferModal';
import {
	RESTING,
	CONFIRM,
	APPROVING,
	TRANSFERRING,
	SUCCESS,
	ERROR
} from './ApproveTransferState';

const FundPage = ({ bounty, refreshBounty }) => {
	const [volume, setVolume] = useState('');
	const [depositPeriodDays, setDepositPeriodDays] = useState(30);
	const [error, setError] = useState('');
	const [buttonText, setButtonText] = useState('Fund');
	const [successMessage, setSuccessMessage] = useState('');
	const [transactionHash, setTransactionHash] = useState(null);
	const [confirmationMessage, setConfirmationMessage] = useState('Please enter a volume greater than 0.');
	const [showApproveTransferModal, setShowApproveTransferModal] = useState(false);
	const [approveTransferState, setApproveTransferState] = useState(RESTING);

	// Context
	const [appState] = useContext(StoreContext);
	const { library, account } = useWeb3();

	// State
	const [token, setToken] = useState(appState.tokens[0]);

	const claimed = bounty.status == 'CLOSED';
	const loadingClosedOrZero = approveTransferState == CONFIRM || approveTransferState == APPROVING || approveTransferState == TRANSFERRING || claimed || parseFloat(volume) == 0 || volume == '';
	const disableOrEnable = `${loadingClosedOrZero ? 'confirm-btn-disabled cursor-not-allowed' : 'confirm-btn cursor-pointer'}`;
	const fundButtonClasses = `flex flex-row justify-center space-x-5 items-center py-3 text-lg text-white ${disableOrEnable}`;

	function resetState() {
		setApproveTransferState(RESTING);
	}

	// Methods
	async function fundBounty() {
		const volumeInWei = volume * 10 ** token.decimals;

		if (volumeInWei == 0) {
			setError({ title: 'Zero Volume Sent', message: 'Must send a greater than 0 volume of tokens.' });
			setApproveTransferState(ERROR);
			setButtonText('Fund');
			return;
		}

		const bigNumberVolumeInWei = ethers.BigNumber.from(volumeInWei.toString());

		let approveSucceeded = false;

		try {
			const callerBalance = await appState.openQClient.balanceOf(library, account, token.address);

			if (callerBalance.lt(bigNumberVolumeInWei)) {
				const title = 'Funds Too Low';
				const message = 'You do not have sufficient funds for this deposit';
				setError({ message, title });
				setApproveTransferState(ERROR);
				return;
			}
		} catch (error) {
			console.log(error);
			const title = 'Error';
			const message = 'A contract call exception occurred';
			setError({ message, title });
			setButtonText('Fund');
			setApproveTransferState(ERROR);
			return;
		}

		try {
			setShowApproveTransferModal(true);
			if (token.address != ethers.constants.AddressZero) {
				setButtonText('Approving');
				setApproveTransferState(APPROVING);
				await appState.openQClient.approve(
					library,
					bounty.bountyAddress,
					token.address,
					bigNumberVolumeInWei
				);
			}
			approveSucceeded = true;
		} catch (error) {
			const { message, title } = appState.openQClient.handleError(error, { bounty });
			setError({ message, title });
			setButtonText('Fund');
			setApproveTransferState(ERROR);
		}

		if (approveSucceeded) {
			setButtonText('Transferring');
			setApproveTransferState(TRANSFERRING);
			try {
				const fundTxnReceipt = await appState.openQClient.fundBounty(
					library,
					bounty.bountyId,
					token.address,
					bigNumberVolumeInWei,
					depositPeriodDays
				);
				setTransactionHash(fundTxnReceipt.transactionHash);
				setApproveTransferState(SUCCESS);
				setSuccessMessage(
					`Successfully funded issue ${bounty.url} with ${volume} ${token.symbol}!`
				);
				refreshBounty();
				setButtonText('Fund');
			} catch (error) {
				const { message, title } = appState.openQClient.handleError(error, { bounty });
				setError({ message, title });
				setButtonText('Fund');
				setApproveTransferState(ERROR);
			}
		}
	}

	function onCurrencySelect(token) {
		setToken(token);
	}

	function onVolumeChange(volume) {
		if(parseFloat(volume))	setVolume(volume);
	}

	// Render
	if (claimed) {
		return (
			<BountyClosed bounty={bounty} />
		);
	} else {
		return (
			<div className="flex flex-1 font-mont justify-center items-center">
				<div className="flex flex-col space-y-5 w-5/6">
					<div className="flex text-3xl font-semibold text-white justify-center pt-16">
						Fund Bounty
					</div>

					<TokenFundBox
						onCurrencySelect={onCurrencySelect}
						onVolumeChange={onVolumeChange}
						token={token}
						volume={volume}
					/>

					<div className="flex w-full flex-row justify-between items-center px-4 py-3 rounded-lg py-1 bg-dark-mode border border-web-gray text-white">
						<div className='text-white flex items-center gap-3 w-full'>
							<ToolTip toolTipText={'This is the number of days that your deposit will be in escrow. After this many days, you\'re deposit will be fully refundable if the bounty has still not been claimed.'} />
							<span>Deposit Locked Period</span>
						</div>

						<div className={'px-4 font-bold fundBox-amount bg-dark-mode'}>
							<input
								className="font-semibold text-right text-white/60 text-2xl number outline-none bg-dark-mode w-full flex-1"
								autoComplete="off"
								value={depositPeriodDays}
								id="deposit-period"
								onChange={(event) => setDepositPeriodDays(event.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							className={fundButtonClasses}
							disabled={loadingClosedOrZero}
							type="button"
							onClick={() => {
								setConfirmationMessage(
									`You are about to fund this bounty at address ${bounty.bountyAddress.substring(
										0,
										12
									)}...${bounty.bountyAddress.substring(32)} with ${volume} ${token.name
									}.
									
									This will be refundable after ${depositPeriodDays} ${depositPeriodDays == 1 ? 'day' : 'days'}.
									
									Is this correct?`
								);
								setApproveTransferState(CONFIRM);
								setShowApproveTransferModal(true);
							}}
						>
							<div>{buttonText}</div>
							<div>{approveTransferState != RESTING && approveTransferState != SUCCESS && approveTransferState != ERROR ? (
								<ButtonLoadingIcon />
							) : null}</div>
						</button>
					</div>
				</div>

				{showApproveTransferModal && <ApproveTransferModal
					approveTransferState={approveTransferState}
					address={account}
					transactionHash={transactionHash}
					confirmationMessage={confirmationMessage}
					error={error}
					setShowApproveTransferModal={setShowApproveTransferModal}
					positiveOption={'Confirm'}
					confirmMethod={fundBounty}
					resetState={resetState}
				/>}
			</div>
		);
	}
};

export default FundPage;
