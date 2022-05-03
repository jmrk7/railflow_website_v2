import React from "react";
import classnames from "classnames/bind";

import { LayoutSectionContainer } from "../../Layout";
import * as styles from "./job-list-item.module.scss";

import Link from "next/link";

const cx = classnames.bind(styles);

const JobListItem = ({ job }) => {
  return (
    <Link href={`/job/${job.id}`} passHref>
      <div id="job-list-item" className={cx("jobListItem")}>
        <LayoutSectionContainer>
          <div className={cx("jobListItem_sectionContainer")}>
            <div className={cx("jobListItem_section")}>
              <h1 className={cx("jobListItem_title")}>{job.name}</h1>
              <h2 className={cx("jobListItem_desc")}>{job.desc}</h2>

              <p className={cx("jobListItem_location")}>
                Location: {job.location}
              </p>
            </div>
          </div>
        </LayoutSectionContainer>
      </div>
    </Link>
  );
};

export default JobListItem;
