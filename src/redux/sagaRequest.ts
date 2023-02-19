import { call, put, takeEvery } from "redux-saga/effects"

interface User {
  id: number
  name: string
  email: string
}

interface DataType {
  data: {
    users?: {
      data: User
    }
    user?: User
  }
}

function* getUserSaga(action: any) {
  try {
    const query = `
      query {
        user(id:${action.payload}) {
          id
          name
          email
        }
      }
    `
    yield put({ type: "LOADED", payload: false })
    const response: Response = yield call(
      fetch,
      "https://graphqlzero.almansi.me/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    )
    const { data }: DataType = yield response.json()
    if (response.ok) {
      yield put({ type: "GET_USER_SUCCESS", payload: data.user })
    } else {
      yield put({ type: "GET_USER_FAILURE", error: "Ошибка при получении пользователя" })
    }
  } catch (error: any) {
    yield put({ type: "GET_USER_FAILURE", error: error.message })
  }
  yield put({ type: "LOADED", payload: true })
}

function* watchGetUser() {
  yield takeEvery("GET_USER_REQUEST", getUserSaga)
}

export default watchGetUser
