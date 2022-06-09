import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";
import Button from "../../button";
import axios from "axios"

import * as styles from "./download-list-item.module.scss";

const cx = classnames.bind(styles);

const DownloadListItem = ({ download }) => {
  if (!download?.id) {
    return null;
  }

  const handleDownload = () => {
    axios.post("/api/routes/mixpanel", download)
  }

  return (
    <div className={cx("downloadListItem")}>
      <LayoutSectionContainer>
        <div className={cx("downloadListItem_sectionContainer")}>
          <div className={cx("downloadListItem_img")}>
            <Image src={download.image} alt={download.name} />
          </div>

          <div className={cx("downloadListItem_section")}>
            <h1 className={cx("downloadListItem_title")}>{download.name}</h1>
            <ul className={cx("downloadListItem_desc")}>
              {download.features.map((feature, index) => (
                <li key={`download-feature-list-item-${index}`}>
                  {feature.text}
                </li>
              ))}
            </ul>
            <div className={cx("downloadListItem_buttons")}>
              {download.releaseNotesUrl && (
                <a
                  className={cx("downloadListItem_link")}
                  href={download.releaseNotesUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Release notes
                </a>
              )}
              {download.hashes && (
                <a
                  className={cx("downloadListItem_link")}
                  href={download.downloadUrl + ".md5"}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MD5
                </a>
              )}
              {download.hashes && (
                <a
                  className={cx("downloadListItem_link")}
                  href={download.downloadUrl + ".sha1"}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SHA
                </a>
              )}
              <a
                href={download.downloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button className={cx("downloadListItem_button")} onClick={handleDownload}>
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="download"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                  </svg>
                  Download
                </Button>
              </a>
            </div>
          </div>
        </div>
      </LayoutSectionContainer>
    </div>
  );
};

export default DownloadListItem;
