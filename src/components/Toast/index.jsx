/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';

import './index.scss';

const Toast = () => {
  return <ToastContainer hideProgressBar={true} />;
};

const notify = (msg, type = 'success') => {
  switch (type) {
    case 'error':
      toast.error(msg, {
        className: 'bg-noti-bg-error fw-bold text-noti-error ps-2',
        icon: () => <img alt="error" src="/assets/images/error.png" />,
      });
      break;
    case 'warn':
      toast.warn(msg, {
        className: 'bg-noti-bg-warn fw-bold text-noti-warn ps-2',
        icon: () => <img alt="warn" src="/assets/images/warn.png" />,
      });
      break;
    case 'success':
      toast.success(msg, {
        className: 'bg-noti-bg-success text-green fw-bold ps-2',
        icon: () => <img alt="success" src="/assets/images/success.png" />,
      });
      break;
    case 'promise':
      toast.promise(
        msg,
        {
          pending: {
            render() {
              return (
                <div className={`position-absolute top-50 start-50 translate-middle`}>
                  <div
                    className="spinner-border"
                    style={{ width: '1rem', height: '1rem' }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="ps-2">Loading</span>
                </div>
              );
            },
            icon: true,
          },
          success: 'Complete. 👌',
          error: 'Error! 🤯',
        },
        {
          className: 'bg-dark',
        }
      );
      break;

    default:
      toast.info(msg, {
        className: 'bg-info',
      });
      break;
  }
};

const notifyHTML = (text) => {
  return toast.success(<div className="text-white" dangerouslySetInnerHTML={{ __html: text }} />);
};

export { Toast, notify, notifyHTML };
