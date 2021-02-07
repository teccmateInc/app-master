import { object, oneOfType, string } from 'prop-types'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const TooltipWrapper = ({
  triggerId,
  tooltip,
  TriggerComp
}) => {
  const renderTooltip = props => (
    <Tooltip id={triggerId} {...props}>
      {tooltip}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement='right'
      delay={{
        show: 250,
        hide: 400,
      }}
      overlay={renderTooltip}
    >
      {({ ref, ...triggerHandler }) => (
        <TriggerComp
          ref={ref}
          {...triggerHandler}
          />
      )}
    </OverlayTrigger>
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
