// Third Party
import React, { useState, useContext, useEffect } from 'react';
import useWeb3 from '../../hooks/useWeb3';
import axios from 'axios';

// Custom
import StoreContext from '../../store/Store/StoreContext';
import ConfirmErrorSuccessModalsTrio from '../ConfirmErrorSuccessModals/ConfirmErrorSuccessModalsTrio';
import useConfirmErrorSuccessModals from '../../hooks/useConfirmErrorSuccessModals';
import LoadingIcon from '../LoadingIcon';

const ClaimBountyButton = ({ issueUrl }) => {
	const { showErrorModal, setShowErrorModal, showSuccessModal, setShowSuccessModal, showConfirmationModal, setShowConfirmationModal } = useConfirmErrorSuccessModals();
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [transactionHash, setTransactionHash] = useState(null);
	const [confirmationMessage, setConfirmationMessage] = useState('');

	// Context
	const [appState] = useContext(StoreContext);
	const { account } = useWeb3();

	useEffect(() => {
		if (issueUrl) {
			setConfirmationMessage(`You are about to claim the bounty on issue ${issueUrl} to the address ${account}. Is this correct ?`);
		}
	}, [issueUrl]);

	// Methods
	const claimBounty = async () => {
		setIsLoading(true);
		axios
			.post(
				`${appState.oracleBaseUrl}/claim`,
				{
					issueUrl,
					payoutAddress: account,
				},
				{ withCredentials: true }
			)
			.then((result) => {
				const { payoutAddress, transactionHash, issueUrl } = result.data;
				setIsLoading(false);
				setTransactionHash(transactionHash);
				setSuccessMessage(
					`Successfully transferred assets on issue at ${issueUrl} to ${payoutAddress}!`
				);
				setShowSuccessModal(true);
			})
			.catch((error) => {
				setIsLoading(false);
				console.log(error.response);
				console.log(error.response.data.message);
				setErrorMessage(error.response.data.message);
				setShowErrorModal(true);
			});
	};

	// Render
	return (
		<>
			<div>
				<button
					className="flex flex-row space-x-1 bg-pink-600 text-white rounded-lg p-2 pr-2"
					onClick={() => setShowConfirmationModal(true)}
				>Claim</button>
				{isLoading && <LoadingIcon />}
				<ConfirmErrorSuccessModalsTrio
					setShowErrorModal={setShowErrorModal}
					showErrorModal={showErrorModal}
					errorMessage={errorMessage}

					setShowConfirmationModal={setShowConfirmationModal}
					showConfirmationModal={showConfirmationModal}
					confirmationTitle={'Claim Bounty'}
					confirmationMessage={confirmationMessage}
					positiveOption={'Yes, Claim!'}
					confirmMethod={claimBounty}

					showSuccessModal={showSuccessModal}
					setShowSuccessModal={setShowSuccessModal}
					successMessage={successMessage}
					transactionHash={transactionHash}
				/>
			</div>
		</>
	);
};

export default ClaimBountyButton;
