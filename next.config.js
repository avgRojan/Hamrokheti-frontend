/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  images:{
    domains:[
      'www.onlinekhabar.com',
      'i.imgur.com',
      'www.google.com',
      'maps.googleapis.com',
      'images.unsplash.com',
      'firebasestorage.googleapis.com',
      "storage.googleapis.com"
    ]

  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
