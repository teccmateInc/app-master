import { object, oneOfType, string } from 'prop-types'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const TooltipWrapper = ({
  triggerId,
  tooltip,
  children,
}) => {
  const renderTooltip = () => (
    <Tooltip id={triggerId}>
      {tooltip}
    </Tooltip>
  )

  return (
    <>
      <OverlayTrigger
        delay={{
          show: 250,
          hide: 400,
        }}
        overlay={renderTooltip}
      >
        {children}
      </OverlayTrigger>
    </>
  )
}

TooltipWrapper.propTypes = {
  triggerId: string.isRequired,
  tooltip: string.isRequired,
  children: oneOfType([
    object.isRequired,
    string.isRequired,
  ]),
}

export default TooltipWrapper
