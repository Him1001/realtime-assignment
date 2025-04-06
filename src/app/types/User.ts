export interface User {
  name: string,
  role: string,
  startDate: string,
  translateX: number,
  swiped: boolean,
  endDate: string
}

export enum UserType {
  current = 'Current',
  previous = 'Previous'
}
