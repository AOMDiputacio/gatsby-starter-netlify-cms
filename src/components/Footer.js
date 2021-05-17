import React from 'react'
import { Link } from 'gatsby'

import SocialIcon from '../components/SocialIcon'
import { FacebookIcon, YoutubeIcon, PinterestIcon, LinkedinIcon } from './Icons'
import useFooterQuery from '../staticQuerys/useFooterQuery'
import { resolveLink } from '../helper/helper'

export default function Footer() {
  const { column1, column2, column3 } = useFooterQuery()

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__section footer__section--social">
          <div className="footer__section--social-wrapper">
            <h3 className="footer__title">{column1.title}</h3>
            <p>{column1.description}</p>
            <div className="footer__social-icons">
              <SocialIcon link={column1.socialLinks.facebook} icon={<FacebookIcon />} />
              <SocialIcon link={column1.socialLinks.youtube} icon={<YoutubeIcon />} />
              <SocialIcon link={column1.socialLinks.pinterest} icon={<PinterestIcon />} />
              <SocialIcon link={column1.socialLinks.linkedin} icon={<LinkedinIcon />} />
            </div>
          </div>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">{column2.title}</h3>
          <div className="footer__list">
            {column2.links.map(({ title, link }, index) => (
              <Link key={index} to={resolveLink(link)}>
                {title}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">{column3.title}</h3>
          <div className="footer__list">
            {column3.links.map(({ title, link }, index) => (
              <Link key={index} to={resolveLink(link)}>
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

