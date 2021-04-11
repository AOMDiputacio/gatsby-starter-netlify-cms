const justPass = (item) => item

export const findByArray = ({ arr1, arr2, cb1 = justPass, cb2 = justPass }) =>
  arr1.filter((item1) =>
    Boolean(arr2.find((item2) => cb1(item1) === cb2(item2)))
  )

/**
 * WEIRD LINK ISSUE
 *
 * IN MARKDOWN    :  /articles
 * GRAPHQL RESULT :  ../pages/article
 *
 * Can't able to find what causes this
 */
export const resolveLink = (link) => link.replace(/^\.\.\/pages/, '')
