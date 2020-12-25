import { LoadingContext } from "components/LoadingContext";
import { func, object, string } from "prop-types";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import BasicTextField from "../form_controls/BasicTextField";
import { AddEditModal } from "../modals";

const EditContactModal = ({ singular, selected, onSubmit, closeModal }) => {
  const { control, handleSubmit, errors } = useForm({ mode: "onBlur" });

  return (
    <AddEditModal
      title={`Edit ${singular}`}
      submitModal={handleSubmit(onSubmit)}
      closeModal={closeModal}
      body={
        <div>
          <BasicTextField
            control={control}
            errors={errors}
            name="firstName"
            label="First Name"
            defaultValue={`${selected.firstName}`}
            rules={{ required: true }}
            autoFocus={true}
          />
          {/* TODO make autoFocus work again */}
          <BasicTextField
            control={control}
            errors={errors}
            name="middleName"
            label="Middle Name"
            defaultValue={`${selected.middleName}`}
          />
          <BasicTextField
            control={control}
            errors={errors}
            name="lastName"
            label="Last Name"
            defaultValue={`${selected.lastName}`}
            rules={{ required: true }}
          />
          <BasicTextField
            control={control}
            errors={errors}
            name="companyName"
            label="Company Name"
            defaultValue={`${selected.companyName}`}
          />
        </div>
      }
    />
  );
};

EditContactModal.propTypes = {
  singular: string.isRequired,
  selected: object.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
};

export default EditContactModal;
