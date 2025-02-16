import { useState, useMemo, useCallback } from "react";
import { useModal } from "@liholiho/react-modal-hook";

export const useModalWithProps = (modalFactory, watchProps) => {
  const [props, setProps] = useState({});
  const modalComponent = useMemo(
    () => modalFactory(props),
    [props, watchProps]
  );
  const [_showModal, hideModal] = useModal(modalComponent, [props, watchProps]);

  const showModal = useCallback((_props) => {
    setProps(_props);
    _showModal();
  }, []);

  return [showModal, hideModal];
};
