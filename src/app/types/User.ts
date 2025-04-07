export interface User {
  id: string,
  name: string,
  role: string,
  startDate: string,
  endDate: string
}

export enum UserType {
  current = 'Current',
  previous = 'Previous'
}
