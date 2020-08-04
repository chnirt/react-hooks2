import React, {
  Fragment,
  useRef,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/useAuth'
import { useTodo } from '../context/useTodo'
import Input from '../components/Input'
import { useCRUDApi } from '../hooks/useCRUDApi'
import Loading from '../components/Loading'
import { useApi } from '../hooks/useApi'

export default function Home() {
  let { email, signout } = useAuth()
  let { t } = useTranslation()
  const inputRef = useRef()
  // let { todos, addTodo, removeTodo } = useTodo();

  // const [count, setCount] = useState(0);

  let { result: resultPoke } = useCRUDApi('https://pokeapi.co/api/v2/pokemon')
  let { result, loading, onGet, onPost, onPut, onDelete } = useCRUDApi(
    'https://5f0ea5f8faef3500160b8663.mockapi.io/todo'
  )
  let { onGet: onGetApi, onDelete: onDeleteApi } = useApi(
    'https://5f0ea5f8faef3500160b8663.mockapi.io/todo'
  )

  // useEffect(() => {
  //   // if (inputRef.current) {
  //   //   inputRef.current.focus();
  //   // }
  //   setTimeout(() => {
  //     setCount(6789);
  //   }, 2000);
  // }, []);

  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     setCount(9876);
  //   }, 2000);
  // }, []);

  async function onLogout() {
    // signout()
    const a = await onGetApi()
    console.log(a)
  }

  // function onSubmit(e) {
  //   e.preventDefault();
  //   addTodo({ title: inputRef.current.value });
  //   inputRef.current.value = "";
  // }

  // function onRemove(id) {
  //   removeTodo(id);
  // }

  const date = new Date()
  useDebugValue(date, date => date.toISOString())

  if (loading) {
    return <Loading />
  }

  return (
    <Fragment>
      {t('HomePage')} <br />
      {t('Hello')} {email},
      <br />
      {/* // DEMO: useReducer */}
      {/* <br />
      <form onSubmit={onSubmit}>
        {count}
        <br />
        <Input ref={inputRef} />
        <button type="submit">Add</button>
        {todos?.map(todo => (
          <div key={todo.id}>
            {todo.title}
            <button onClick={() => onRemove(todo.id)}>delete</button>
          </div>
        ))}
      </form> */}
      {/* // DEMO: useApi */}
      <br />
      <Input ref={inputRef} />
      <button
        onClick={() => {
          onPost({ title: inputRef.current.value })
          inputRef.current.value = ''
        }}
      >
        Post
      </button>
      <br />
      {result.map(element => (
        <div key={element.id}>
          {element.title}
          <button
            onClick={async () => {
              let detail = await onGet(element.id)
              console.log(detail)
            }}
          >
            detail
          </button>
          <button
            onClick={() => {
              onPut(element.id, { title: inputRef.current.value })
              inputRef.current.value = ''
            }}
          >
            update
          </button>
          <button
            onClick={async () => {
              await onDeleteApi(element.id)
              // onDelete(element.id)
            }}
          >
            delete
          </button>
        </div>
      ))}
      {JSON.stringify(resultPoke, null, 2)}
      <br />
      <button onClick={onLogout}>{t('Logout')}</button>
      <br />
    </Fragment>
  )
}
