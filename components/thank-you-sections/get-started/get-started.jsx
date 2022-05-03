import React from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../Layout';
import * as styles from './get-started.module.scss';

const cx = classnames.bind(styles);

const GetStarted = () => {
  return (
    <section id="get-started" className={cx('getStarted')}>
      <LayoutSectionContainer>
        <div className={cx('getStarted_sectionContainer')}>
          <h2 className={cx('getStarted_title')}>
            Learn How to Get Started with Railflow
          </h2>
          <p className={cx('getStarted_videos')}>
            <div className={cx('getStarted_videoWrapper')}>
              <iframe
                title={'example 1'}
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ThiCMd5kGbE?controls=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                frameBorder={0}
              />
              <h3 className={cx('getStarted_videoTitle')}>
                Example Video Title 1
              </h3>
            </div>
            <div className={cx('getStarted_videoWrapper')}>
              <iframe
                title={'example 2'}
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ThiCMd5kGbE?controls=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                frameBorder={0}
              />
              <h3 className={cx('getStarted_videoTitle')}>
                Example Video Title 2
              </h3>
            </div>
          </p>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default GetStarted;
