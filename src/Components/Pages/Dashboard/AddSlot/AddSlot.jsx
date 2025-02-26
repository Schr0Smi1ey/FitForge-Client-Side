import React from "react";
import AddSlotForm from "../../../Forms/AddSlotForm";
import { Helmet } from "react-helmet";

const AddSlot = () => {
  return (
    <div>
      <Helmet>
        <title>FitForge | Dashboard | Add Slot</title>
      </Helmet>
      <AddSlotForm></AddSlotForm>
    </div>
  );
};

export default AddSlot;
