import React from "react";
import { useConfirmationDialog } from "./ConfirmationDialog";
import styled from "styled-components";

const StyledButton = styled.button``;

const DeleteButton: React.FC<{ callback: any; name: string }> = ({
  callback,
  name,
}) => {
  const { getConfirmation } = useConfirmationDialog();

  const onClick = async () => {
    const confirmed = await getConfirmation({
      title: "Delete reservation",
      message: `You are about to delete the reservation ${name}. If you proceed with this action the item will be permanently deleted.`,
    });
    //@ts-ignore
    if (confirmed) callback();
  };

  return (
    <StyledButton  className="p-1 text-white bg-red-600 rounded-md" onClick={onClick}>
      delete
    </StyledButton>
  );
};

export default DeleteButton;
