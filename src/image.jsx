import { useState, useCallback, useEffect } from 'react'
import styles from './image.module.css'
//import styles from './index.scss'


const Image = ({ zoom, ...rest }) => {
  const [click, setClick] = useState(false)

  const setFlag = () => {
    setClick(true)
  }

  const unsetFlag = () => {
    setClick(false)
  }

  if (!zoom) return <img {...rest} />
  else
    return (
      <>
        {click ? (
          <div onClick={unsetFlag} className={`${styles.lightbox} ${styles.show} relative`}>
            <img {...rest} className={`${styles.show_image}`}> </img>
          </div>
        ) : (
          <img {...rest} onClick={setFlag}></img>
        )}
      </>
    )
}

export default Image
