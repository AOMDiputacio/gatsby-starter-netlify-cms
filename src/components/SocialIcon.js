import React from 'react'

export default function SocialIcon({ link, icon }) {
  return link ? (
    <a
      target="_blank"
      rel="noreferrer"
      href={link}
    >
      {icon}
    </a>
  ) : null
}