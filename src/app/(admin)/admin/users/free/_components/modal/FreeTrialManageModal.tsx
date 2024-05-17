'use client';

import FormContext from '../../register/_components/FormContext';
import DeleteFreeTrialModal from './DeleteFreeTrialModal';
import UpdateFreeTrialModal from './UpdateFreeTrialModal';

function FreeTrialManageModal() {
  return (
    <>
      <FormContext>
        <UpdateFreeTrialModal />
      </FormContext>
      <DeleteFreeTrialModal />
    </>
  );
}

export default FreeTrialManageModal;
