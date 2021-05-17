import React from 'react'

export default function PageProgress() {
  const [progress, setProgress] = React.useState('0%')

  React.useEffect(() => {
    function prgerssChange() {
      let ratio =
        (window.scrollY /
          (window.document.body.offsetHeight - window.innerHeight)) *
        100
      ratio = ratio > 100 ? 100 : ratio < 0 ? 0 : ratio.toFixed(0)
      setProgress(ratio + '%')
    }

    window.addEventListener('scroll', prgerssChange)
    window.addEventListener('load', prgerssChange)
    return () => {
      window.removeEventListener('scroll', prgerssChange)
      window.removeEventListener('load', prgerssChange)
    }
  }, [setProgress])
  return <div className="page-progress" style={{ width: progress }} />
}
