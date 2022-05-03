import React from 'react';

import Layout from '../layout';
import FormContainer from '../form-container';
import SignUpForm from '../sign-up-form';
import SignUpHero from '../sign-up-hero';

import classnames from 'classnames/bind';
import * as styles from './auth.module.scss';

const cx = classnames.bind(styles);

const Register = () => {
  return (
    <Layout isHeaderPresent={false} isFooterPresent={false}>
      <div className={cx('signUpWrapper')}>
        <SignUpHero />
        <FormContainer>
          <SignUpForm />
        </FormContainer>
      </div>
    </Layout>
  );
};

export default Register;
