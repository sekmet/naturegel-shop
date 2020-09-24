import PropTypes from 'prop-types'
import React from 'react'

const Tab = ({ onClick, tabIndex, title, isActive, color }) => (
    <li className="-mb-px mr-1">
        <a
            onClick={event => {
                event.preventDefault()
                onClick(tabIndex)
            }}
            className={`block ${
                isActive ? 'bg-green-300' : 'bg-gray-200'
            } ${!isActive &&
            'hover:bg-green-300'} rounded py-2 px-3 ${isActive &&
            `bg-${color}`} ${!isActive && `text-${color}`} text-white`}
            href="#"
        >
            {title}
        </a>
    </li>
)


Tab.propTypes = {
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
    isActive: PropTypes.bool,
}

Tab.defaultProps = {
    color: 'black'
}

export default Tab