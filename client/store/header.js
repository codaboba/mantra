const GET_HEADER = 'GET_HEADER'
export const getHeader = header => ({type: GET_HEADER, header})

export default function(state = '', action) {
  switch (action.type) {
    case GET_HEADER:
      return action.header
    default:
      return state
  }
}
