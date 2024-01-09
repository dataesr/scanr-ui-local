import { cloneElement, useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import cn, { Argument } from 'classnames';
import { ModalTitle, ModalTitleProps } from './ModalTitle';
import { ModalClose, ModalCloseProps } from './ModalClose';
import { getChildrenOfType } from '../../utils/children';
import { useFocusTrap } from './useFocusTrap';
import { Merge } from '../../types/polymophic';
import { ModalContent, ModalFooter } from '.';

type ModalSizes = "sm" | "md" | "lg" | "xl";

type ModalProps = Merge<React.HTMLAttributes<HTMLDialogElement>, {
  size?: ModalSizes;
  isOpen: boolean;
  canClose?: boolean;
  hide: Function;
  id?: string;
  className?: Argument;
}>

type UncontrolledModalProps = Omit<ModalProps, 'isOpen' | 'hide' | 'canClose'>;

const ControlledModal = ({
  children,
  hide,
  size = "md",
  id,
  className,
  isOpen,
  canClose,
  ...props
}: ModalProps) => {
  const [focusBackTo, setFocusBackTo] = useState<HTMLElement | null>(null);
  const colSizes = { sm: 4, lg: 8, md: 6, xl: 10 };
  const colSize = colSizes[size];
  const _classes = cn('fr-modal', className);
  const modalRef = useRef(null);
  const title = getChildrenOfType(children, ModalTitle)?.[0];
  const content = getChildrenOfType(children, ModalContent);
  const footer = getChildrenOfType(children, ModalFooter)?.[0];
  const close = getChildrenOfType(children, ModalClose)?.[0];
  const modalId = id || useId();

  useEffect(() => {
    const modal: HTMLDialogElement = modalRef.current!
    if (!modal) return;

    if (isOpen) {
      setFocusBackTo(document.activeElement as HTMLElement)
      document?.getElementById(modalId)?.classList.add('fr-modal--opened')
      // document.body.style.overflow = 'hidden';

    }
    if (!isOpen) {
      document?.getElementById(modalId)?.classList.remove('fr-modal--opened')
      // document.body.style.overflow = 'auto';
    }

  }, [isOpen])

  useEffect(() => {
    const modal: HTMLDialogElement = modalRef.current!
    if (!modal) return;

    modal.addEventListener('dsfr.conceal', (e) => e.stopPropagation())
    modal.addEventListener('dsfr.disclose', (e) => e.stopPropagation())

    return () => {
      modal.removeEventListener('dsfr.conceal', (e) => e.stopPropagation())
      modal.removeEventListener('dsfr.disclose', (e) => e.stopPropagation())
    }
  }, [])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!canClose) return;
    if (!modalRef.current || (modalRef.current === e.target) || (e.target as Element).className.indexOf('closing-overlay') > -1) {
      hide();
    }
  };

  useFocusTrap(modalRef, isOpen, focusBackTo);

  const closeComponent = close
    ? cloneElement(close as React.ReactElement<ModalCloseProps>, { onClick: () => hide(), controls: modalId })
    : canClose
      ? <ModalClose onClick={() => hide()} controls={modalId} />
      : null

  const component = (
    <dialog
      aria-labelledby={`${modalId}-title`}
      aria-modal="true"
      className={_classes}
      ref={modalRef}
      id={modalId}
      role="dialog"
      onClick={(e) => handleOverlayClick(e)}
      {...props}
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center closing-overlay">
          <div className={`fr-col-12 fr-col-md-${colSize}`}>
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                {closeComponent}
              </div>
              <div className="fr-modal__content">
                {title && cloneElement(title as React.ReactElement<ModalTitleProps>, { id: modalId })}
                {content ?? null}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );

  return (
    ReactDOM.createPortal(
      component,
      document.body,
    )
  );
};

const UncontrolledModal = ({
  children,
  size = "md",
  id: modalId,
  className,
  ...props
}: UncontrolledModalProps) => {
  const colSizes = { sm: 4, lg: 8, md: 6, xl: 10 };
  const colSize = colSizes[size];
  const _classes = cn('fr-modal', className);
  const title = getChildrenOfType(children, ModalTitle)?.[0];
  const content = getChildrenOfType(children, ModalContent);
  const footer = getChildrenOfType(children, ModalFooter)?.[0];
  const close = getChildrenOfType(children, ModalClose)?.[0];


  const closeComponent = close
    ? cloneElement(close as React.ReactElement<ModalCloseProps>, { controls: modalId })
    : <ModalClose controls={modalId} />

  const component = (
    <dialog
      aria-labelledby={`${modalId}-title`}
      className={_classes}
      id={modalId}
      role="dialog"
      {...props}
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center closing-overlay">
          <div className={`fr-col-12 fr-col-md-${colSize}`}>
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                {closeComponent}
              </div>
              <div className="fr-modal__content">
                {title && cloneElement(title as React.ReactElement<ModalTitleProps>, { id: modalId })}
                {content ?? null}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
  return (
    ReactDOM.createPortal(
      component,
      document.body,
    )
  );
};

export const Modal = ({
  id,
  size = "md",
  hide,
  isOpen = false,
  className,
  canClose = true,
  ...props
}: ModalProps) => {
  if (id) return <UncontrolledModal id={id} size={size} className={className} {...props} />
  return (
    <ControlledModal
      id={id}
      isOpen={isOpen}
      className={className}
      size={size}
      hide={hide}
      canClose={canClose}
      {...props}
    />
  );
};
