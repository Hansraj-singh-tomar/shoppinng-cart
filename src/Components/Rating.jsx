import PropTypes from 'prop-types'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({rating, onClick, style}) => {
  return (
    <>
        {
            [...Array(5)].map((_, i) => {
                return (
                    <span key={i} style={style} onClick={() => onClick(i+1)}>
                        {
                            rating > i ? <AiFillStar fontSize="15px"/> : <AiOutlineStar fontSize="15px"/>
                        }
                    </span>
                )
            })
        }
    </>
  )
}

Rating.propTypes = {
    rating: PropTypes.number,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default Rating