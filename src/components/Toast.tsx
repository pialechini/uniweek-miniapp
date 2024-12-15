import { mdiCheckCircle, mdiCloseCircle, mdiInformation } from '@mdi/js';
import MdiIcon from '@mdi/react';
import classNames from 'classnames';
import { ReactElement } from 'react';
import {
  ToastContainer as ToastifyContainer,
  toast as toastify,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './toast.module.scss';

function Icon({
  className,
  color,
  path,
}: {
  path: string;
  color: string;
  className: string;
}) {
  return (
    <div className={styles.icon}>
      <div className={classNames(styles.blur, className)} />
      <MdiIcon path={path} size={'24px'} color={color} />
    </div>
  );
}

function ToastContainer() {
  return (
    <div id={styles.positionContainer}>
      <ToastifyContainer
        className={styles.toastContainer}
        position="top-right"
        autoClose={3000}
        toastClassName={styles.toastWrappper}
        hideProgressBar
        newestOnTop
        icon={false}
        closeOnClick
      />
    </div>
  );
}

function ToastContent(title: string, content: string, icon: ReactElement) {
  return (
    <div className={styles.toastContent}>
      {icon}

      <div className={styles.column}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}

function openToast(
  toastifyFn:
    | typeof toastify.success
    | typeof toastify.warn
    | typeof toastify.error,
  title: string,
  content: string,
  icon: ReactElement,
) {
  return toastifyFn(ToastContent(title, content, icon), {
    closeButton: false,
  });
}

const toast = {
  success: (title: string, content: string) =>
    openToast(
      toastify.success,
      title,
      content,
      <Icon
        className={styles.successBlur}
        color="#00DF80"
        path={mdiCheckCircle}
      />,
    ),
  error: (title: string, content: string) =>
    openToast(
      toastify.error,
      title,
      content,
      <Icon
        className={styles.errorBlur}
        color="#F04248"
        path={mdiCloseCircle}
      />,
    ),
  warn: (title: string, content: string) =>
    openToast(
      toastify.warn,
      title,
      content,
      <Icon
        className={styles.warnBlur}
        color="#FFD21E"
        path={mdiInformation}
      />,
    ),
};

export { toast, ToastContainer };
