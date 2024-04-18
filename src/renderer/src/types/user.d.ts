type UserContact = {
  id: string
  phonenumber: number
  cost: number
}

type UserContactsData = { [id: string]: UserContact }

type User = {
  id: string
  username: string
  email: string
  contacts: UserContactsData
}
