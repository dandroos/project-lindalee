import { Link, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import React, { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import Page from "../components/Page"
import { setLanguage, setLocationId } from "../redux/actions"

const CatsPage = ({ dispatch, pageContext }) => {
  const { language, locationId, title } = pageContext

  useEffect(() => {
    dispatch(setLanguage(language))
    dispatch(setLocationId(locationId))
    //eslint-disable-next-line
  }, [])

  const data = useStaticQuery(graphql`
    {
      body: file(sourceInstanceName: { eq: "pages" }, name: { eq: "cats" }) {
        childMarkdownRemark {
          frontmatter {
            price
            text {
              en
              es
              de
            }
          }
        }
      }
      img: file(sourceInstanceName: { eq: "pages" }, name: { eq: "cats" }) {
        childMarkdownRemark {
          frontmatter {
            featured_image {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 2.5
                  transformOptions: { cropFocus: CENTER }
                )
              }
            }
          }
        }
      }
      mobileImg: file(
        sourceInstanceName: { eq: "pages" }
        name: { eq: "cats" }
      ) {
        childMarkdownRemark {
          frontmatter {
            featured_image {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.3)
              }
            }
          }
        }
      }
    }
  `)

  const image = getImage(
    data.img.childMarkdownRemark.frontmatter.featured_image
  )

  const mobileImage = getImage(
    data.mobileImg.childMarkdownRemark.frontmatter.featured_image
  )
  const text = {
    price: {
      en: "Price",
      es: "Precio",
      de: "Preis",
    },
    perDay: {
      en: "per day",
      es: "por día",
      de: "pro Tag",
    },
  }

  return (
    <Page
      title={title}
      img={image}
      mobImg={mobileImage}
      price={`€${data.body.childMarkdownRemark.frontmatter.price} ${text.perDay[language]}`}
    >
      <ReactMarkdown
        includeElementIndex
        components={{
          p: ({ ...props }) => {
            return (
              <Typography
                variant={props.index === 0 ? "lead" : undefined}
                paragraph
              >
                {props.children}
              </Typography>
            )
          },
          a: ({ ...props }) => (
            <Link href={props.href} target="_blank">
              {props.children}
            </Link>
          ),
        }}
      >
        {data.body.childMarkdownRemark.frontmatter.text[language]}
      </ReactMarkdown>
    </Page>
  )
}

export default connect()(CatsPage)
