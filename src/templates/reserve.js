import { Link, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { setLanguage, setLocationId } from "../redux/actions"

import BookingForm from "../components/BookingForm"
import Page from "../components/Page"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import { getImage } from "gatsby-plugin-image"

const ReservePage = ({ dispatch, pageContext, currLanguage }) => {
  const { language, title } = pageContext

  useEffect(() => {
    dispatch(setLocationId("book"))
    if (language !== currLanguage) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])

  const data = useStaticQuery(graphql`
    {
      body: file(sourceInstanceName: { eq: "pages" }, name: { eq: "book" }) {
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
      img: file(sourceInstanceName: { eq: "pages" }, name: { eq: "book" }) {
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
        name: { eq: "book" }
      ) {
        childMarkdownRemark {
          frontmatter {
            featured_image {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 1.3
                  transformOptions: { cropFocus: CENTER }
                )
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
  return (
    <>
      <BookingForm />
      <Page title={title} img={image} mobImg={mobileImage} reservePage>
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
    </>
  )
}

const stp = s => ({
  currLanguage: s.language,
})

export default connect(stp)(ReservePage)
