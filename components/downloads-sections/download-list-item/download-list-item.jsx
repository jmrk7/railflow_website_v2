import React from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import { LayoutSectionContainer } from "../../Layout";
import Button from "../../button";
import { DownloadOutlined } from '@ant-design/icons';
import axios from "axios"

import * as styles from "./download-list-item.module.scss";
 
const cx = classnames.bind(styles);

const DownloadListItem = ({ download }) => {
  if (!download?.id) {
    return null;
  }

  const sendDatatoMixpanel = (value) => {
    var pluginName = {};
    download.id === "Readyapi"
      ? pluginName.name = value
      : pluginName.name = download.id
    axios.post("/api/routes/mixpanel", pluginName);
  }

  return (
    <div className={cx('downloadListItem')}>
      <LayoutSectionContainer>
        <div className={cx('downloadListItem_sectionContainer')}>
          <img
            className={cx('downloadListItem_img')}
            src={download.image}
            alt={download.name}
          />
          <div className={cx('downloadListItem_section')}>
            <h1 className={cx('downloadListItem_title')}>
              {download.name}
            </h1>
            <ul className={cx('downloadListItem_desc')}>
              {download.features.map((feature, index) => (
                  feature["text"] 
                  ? <li key={`download-feature-list-item-${index}`}>
                    {feature.text}
                    </li>
                  : <div style={{marginTop: "1.5rem"}}></div>
              ))}              
            </ul>
            <div className={cx('downloadListItem_buttons')}>
              {download.releaseNotesUrl && (
                <a
                  className={cx('downloadListItem_link')}
                  href={download.releaseNotesUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Release notes
                </a>
              )}
              {download.hashes && (
                <a
                  className={cx('downloadListItem_link')}
                  href={download.downloadUrl + '.md5'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MD5
                </a>
              )}
              {download.hashes && (
                <a
                  className={cx('downloadListItem_link')}
                  href={download.downloadUrl + '.sha1'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SHA
                </a>
              )}
              {download.downloadUrl && (
                <a
                  className={cx('downloadListItem_link')}
                  // href={download.downloadUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={sendDatatoMixpanel}
                  style={{marginRight: "0px"}}
                >
                  <Button className={cx('downloadListItem_button')}>
                    <DownloadOutlined />
                    Download
                  </Button>
                </a>
              )} 
              { download.downloadItem && (
                download.downloadItem.map((value, index) => (              
                  <a 
                    rel="noreferrer noopener"
                    target="_blank"
                    className={cx('downloadListItem_link')}
                    onClick={() => sendDatatoMixpanel(value.id)}
                    key={index}
                    style={{marginLeft: "0.5rem", marginRight: "0px"}}
                    href={value.href}
                  >
                    <Button className={cx('downloadListItem_button')}>
                      <img src={value.img} alt={value.alt} style={{width: "24px", height: "24px", marginRight: "16px"}} />
                      {value.text}
                    </Button>
                  </a>
                ))
              )}             
            </div>
          </div>
        </div>
      </LayoutSectionContainer>
    </div>
  );
};

export default DownloadListItem;
