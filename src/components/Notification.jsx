/* eslint-disable react/jsx-closing-tag-location */

const Notification = ({ successMessage, errorMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  }

  return (
    <div className='notification'>
      {successMessage
        ? (
          <div className='success'>
            {successMessage}
          </div>
          )
        : (
          <div className='error'>
            {errorMessage}
          </div>

          )}

    </div>
  )
}

export default Notification
