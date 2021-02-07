export type Coffee = {
  value: string,
  label: string,
  v60_setting: number,
  aeropress_setting: number,
  available_at_home: boolean
}

export type CoffeeList = { label: string; options: Coffee[] }