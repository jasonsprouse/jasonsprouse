import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import styles from './blog.module.css'


class AboutIndex extends React.Component {
    render() {
      const siteTitle = get(this, 'props.data.site.siteMetadata.title')
      const [author] = get(this, 'props.data.allContentfulPerson.edges')
  
      return (
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={author.node} />
        </div>
      )
    }
  }
  
  export default AboutIndex
  
  export const pageQuery = graphql`
    query AboutIndexQuery {
      allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
        edges {
          node {
            title
            slug
            publishDate(formatString: "MMMM Do, YYYY")
            tags
            heroImage {
              sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
                ...GatsbyContentfulSizes_withWebp
              }
            }
            description {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
      allContentfulPerson(filter: { id: { eq: "c15jwOBqpxqSAOy2eOO4S0m" } }) {
        edges {
          node {
            name
            shortBio {
              shortBio
            }
            title
            heroImage: image {
              sizes(
                maxWidth: 1180
                maxHeight: 480
                resizingBehavior: PAD
                background: "rgb:000000"
              ) {
                ...GatsbyContentfulSizes_withWebp
              }
            }
          }
        }
      }
    }
  `