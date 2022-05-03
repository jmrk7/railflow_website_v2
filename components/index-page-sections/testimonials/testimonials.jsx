import React from 'react';
import ReactStars from 'react-stars';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../Layout';
// import ArrowLeftIcon from '../../../assets/icons/arrow_left.svg';
// import ArrowRightIcon from '../../../assets/icons/arrow_right.svg';
import * as styles from './testimonials.module.scss';

const cx = classnames.bind(styles);

// TODO: move to constant
const testimonials = [
  {
    id: 'sarah-lin',
    feedback: 4.5,
    description:
      'I love SoftBit! The integration process was super simple. We use it every single day to keep track of all our daily downloads.',
    customer: {
      avatar: "/images/avatar_1.jpeg",
      name: 'Sarah Lin',
      role: 'Developer at FinApp',
    },
  },
  {
    id: 'josh-stevens',
    feedback: 3.5,
    description:
      "Softbit is the ultimate analytics tool for every company that's serious about maximizing their website's traffic and click-through-rate.",
    customer: {
      avatar: "/images/avatar_1.jpeg",
      name: 'Josh Stevens',
      role: 'Founder at CourseApp',
    },
  },
  {
    id: 'andrew-young',
    feedback: 3,
    description:
      'You can tell that SoftBit is the best analytics tool after using it for a few minutes. I absolutely love the intuitive and clean dashboard.',
    customer: {
      avatar: "/images/avatar_1.jpeg",
      name: 'Andrew Young',
      role: 'Developer',
    },
  },
  // {
  //   id: 'april-reeves',
  //   feedback: 5,
  //   description:
  //     'I love SoftBit! The integration process was super simple. We use it every single day to keep track of all our daily downloads.',
  //   customer: {
  //     avatar: "/images/avatar_1.jpeg",
  //     name: 'April Reeves',
  //     role: 'Entrepreneur',
  //   },
  // },
  // {
  //   id: 'jeremiah-pearson',
  //   feedback: 3,
  //   description:
  //     "Softbit is the ultimate analytics tool for every company that's serious about maximizing their website's traffic and click-through-rate.",
  //   customer: {
  //     avatar: "/images/avatar_1.jpeg",
  //     name: 'Jeremiah Pearson',
  //     role: 'UX Designer',
  //   },
  // },
  // {
  //   id: 'jeremiah-pearson',
  //   feedback: 5,
  //   description:
  //     "Softbit is the ultimate analytics tool for every company that's serious about maximizing their website's traffic and click-through-rate.",
  //   customer: {
  //     avatar: "/images/avatar_1.jpeg",
  //     name: 'Jeremiah Pearson',
  //     role: 'UX Designer',
  //   },
  // },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className={cx('testimonials')}>
      <LayoutSectionContainer>
        <h1 className={cx('testimonials_title')}>
          What our customer say about Railflow
        </h1>

        <div className={cx('testimonials_testimonialContainer')}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={cx('testimonialsTestimonial')}
            >
              <div className={cx('testimonialsTestimonial_rating')}>
                <ReactStars
                  value={testimonial.feedback}
                  count={5}
                  size={24}
                  color="#f8a619"
                />
              </div>

              <p
                className={cx('testimonialsTestimonial_description')}
              >
                {testimonial.description}
              </p>

              <div className={cx('testimonialsTestimonialCustomer')}>
                <div
                  style={{
                    backgroundImage: `url(${testimonial.customer.avatar})`,
                  }}
                  className={cx(
                    'testimonialsTestimonialCustomer_avatar',
                  )}
                />
                <div
                  className={cx(
                    'testimonialsTestimonialCustomer_infoContainer',
                  )}
                >
                  <div
                    className={cx(
                      'testimonialsTestimonialCustomer_name',
                    )}
                  >
                    {testimonial.customer.name}
                  </div>
                  <div
                    className={cx(
                      'testimonialsTestimonialCustomer_role',
                    )}
                  >
                    {testimonial.customer.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default Testimonials;
