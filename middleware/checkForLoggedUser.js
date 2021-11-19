export default function ({ store, redirect }) {
  if (!store.state.login.currentUser) {
    redirect('/')
  }
}
