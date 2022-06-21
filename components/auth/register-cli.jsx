import React from 'react';

import Layout from "../Layout";
import FormContainer from '../form-container';
import SignUpForm from '../sign-up-form/sign-up-form-cli';
import SignUpHero from '../sign-up-hero/sign-up-hero-cli';

import classnames from 'classnames/bind';
import * as styles from './auth.module.scss';

const cx = classnames.bind(styles);

const Register = ({free}) => {
  return (
    <Layout isHeaderPresent={false} isFooterPresent={false}>
      <div className={cx('signUpWrapper')}>
        <SignUpHero />
        <FormContainer>
          <SignUpForm free={free}/>
        </FormContainer>
      </div>
    </Layout>
  );
};

export default Register;
