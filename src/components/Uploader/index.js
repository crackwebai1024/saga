import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as S from './styled';

const Uploader = ({
  name,
  accept,
  fileDroped,
  defaultValue,
  hasPreviewAvatar,
  t,
}) => {
  const [logoImage, setLogoImage] = useState(defaultValue);
  return (
    <>
      { hasPreviewAvatar && <Avatar alt="Avatar Preview" src={logoImage} /> }
      <Field name={name}>
        {({ input: { onChange }, meta }) => (
          <Dropzone
            onDrop={(files) => {
              onChange(files);
              if (fileDroped) {
                fileDroped(files);
              }
              if (hasPreviewAvatar) {
                setLogoImage(URL.createObjectURL(files[0]));
              }
            }}
            accept={accept}
          >
            {({ getRootProps, getInputProps, acceptedFiles }) => (
              <S.Container>
                <S.DragContainer {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    acceptedFiles.length
                      ? (
                        <S.Text>{acceptedFiles[0].name}</S.Text>
                      )
                      : (
                        <S.Text>{t('common.upload_file')}</S.Text>
                      )
                  }
                </S.DragContainer>
                {
                  meta.touched && meta.error && (
                    <FormHelperText error>
                      {meta.touched && meta.error ? meta.error : null}
                    </FormHelperText>
                  )
                }
              </S.Container>
            )}
          </Dropzone>
        )}
      </Field>
    </>
  );
};

Uploader.defaultProps = {
  accept: undefined,
  fileDroped: undefined,
  defaultValue: undefined,
  hasPreviewAvatar: undefined,
};

Uploader.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  fileDroped: PropTypes.func,
  defaultValue: PropTypes.any,
  hasPreviewAvatar: PropTypes.bool,
};

export default withTranslation()(Uploader);
