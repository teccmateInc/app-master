import { FaQuestionCircle } from 'components/FontAwesome'
import { array, string } from 'prop-types'
import React from 'react'
import { Popover } from 'react-bootstrap'


const DefaultContent = ({header, content}) => (
    <>
        <Popover.Title>
            <div className='statusInfoHeaderSpacing statusSpacing'>
                <FaQuestionCircle/>
                <span style={{paddingRight: '10px'}}/>
                <span className='statusHeader'>
          {header}
        </span>
            </div>
        </Popover.Title>
        <Popover.Content>
            {
                content.map((d, i) => (
                    <div
                        key={i}
                        className='statusSpacing'>
                        <p>
              <span className='statusTitle'>
                {d.title}
              </span>
                            <span className='statusInfo'>
                {d.info}
              </span>
                        </p>
                        {d.items &&
                        <ul>
                            {d.items.map((item, ii) => (
                                <li key={ii}>{item}</li>
                            ))}
                        </ul>
                        }
                    </div>
                ))
            }
        </Popover.Content>
    </>
)

DefaultContent.propTypes = {
    content: array.isRequired,
    header: string.isRequired,
}

export default DefaultContent
