/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import ComponentSVG from 'components/ComponentSVG';
import ModalDAMComponent from 'components/ModalDamComponent';
import React, { useState } from 'react';
import { Button, Col, Ratio, Row } from 'react-bootstrap';

import ComponentImage from '../../ComponentImage';
import './index.scss';
const FormImage = ({ field }) => {
  const [file, setFile] = useState(
    field.isMulti ? field.getValueSelected ?? [] : field.getValueSelected ?? null
  );

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const onSelect = (data) => {
    let convertedData = data?.map((item) => ({
      id: item.id,
      download_url: item.download_url,
      name: item.name,
    }));
    if (field.isMulti) {
      convertedData.length && setFile([...file, ...convertedData]);
      field.handleChange([...file, ...convertedData]);
    } else {
      convertedData.length && setFile(convertedData);
      field.handleChange(convertedData);
    }
    setShow(false);
  };
  const deleteImage = (e, index) => {
    e.stopPropagation();
    if (field.isMulti) {
      setFile(file.splice(index, 1));
      field.handleChange([...file.splice(index, 1)]);
    } else {
      setFile(null);
      field.handleChange(null);
    }
  };
  return (
    <>
      {field.isMulti ? (
        <div className="position-relative field-multi-image">
          <Row className="gx-24 mb-16">
            {file &&
              Array.isArray(file) &&
              file?.map((item, key) => {
                return item ? (
                  <Col lg={2} key={key}>
                    <Ratio aspectRatio="1x1">
                      <div className="d-flex align-items-center w-100 h-100 border image-wrapper">
                        <div
                          className="delete-icon p-sm rounded-2"
                          onClick={(e) => {
                            deleteImage(e, key);
                          }}
                        >
                          <ComponentSVG url="/assets/images/delete.svg" className={'bg-danger'} />
                        </div>
                        <ComponentImage src={item?.download_url} alt={field.value} />
                      </div>
                    </Ratio>
                  </Col>
                ) : null;
              })}
          </Row>
          <Button
            variant={`light`}
            className={` px-24 py-1 fw-semibold d-flex align-items-center rounded-1 border`}
            onClick={() => {
              setShow(true);
            }}
          >
            <ComponentSVG url="/assets/images/add-media-image.svg" className="bg-black me-1" />
            Add More Photo
          </Button>
        </div>
      ) : (
        <div className="position-relative">
          <div
            className="d-flex align-items-center justify-content-center p-24 field-single-image border border-da-1 rounded-3 cursor-pointer position-relative  image-wrapper"
            onClick={() => {
              setShow(true);
            }}
          >
            {(!file || (Array.isArray(file) && !file[0])) && (
              <div className="d-flex align-items-center p-2 w-100">
                <div className="text-center fs-14 text-body opacity-50 w-100">
                  <p className="mb-0">Browse from computer Choose from media Drag file here</p>
                </div>
              </div>
            )}
            {file?.length
              ? file[0] && (
                  <>
                    <div
                      className="delete-icon p-sm rounded-2"
                      onClick={(e) => {
                        deleteImage(e, 0);
                      }}
                    >
                      <ComponentSVG url="/assets/images/delete.svg" className={'bg-danger'} />
                    </div>
                    <ComponentImage src={file[0]?.download_url} alt={field.value} />
                  </>
                )
              : null}
          </div>
          <p className="my-8px fs-14 opacity-50">
            Max filesize is: 2 MB (Allowed file extension: jpg, jpeg, gif, png)
          </p>
        </div>
      )}
      <ModalDAMComponent show={show} onHide={handleClose} onSelect={onSelect} />
    </>
  );
};

export default FormImage;
